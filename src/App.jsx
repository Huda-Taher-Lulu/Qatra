import { useEffect, useMemo, useState } from 'react';
import { DonorDashboard, Profile, InstitutionDashboard, ResubmitApplication, ProtectedService } from './Sprint2';
import { BloodRequests, CreateBloodRequest, BloodRequestDetails, EditBloodRequest } from './Sprint3';
import { BankDashboard, Inventory, AddBloodUnit, InventoryAlerts, IncomingRequests, BankRequestDetails } from './Sprint4';
import { DonationCallsManagement, CreateDonationCall, TargetDonors, CallResponses, DonorCalls, DonorCallDetails, DonationHistory, RecordDonation } from './Sprint5';
import { InstitutionCampaigns, CampaignForm, PublicCampaigns, CampaignDetails, CampaignParticipants, NotificationCenter } from './Sprint6';
import { SupervisorGuard, SupervisorPortal, SupervisorDashboardEnhanced, SupervisorInstitutionsEnhanced, SupervisorBloodBanks, SupervisorRequestsEnhanced, SupervisorDonorsEnhanced, SupervisorActivityEnhanced, SupervisorReports } from './Sprint7';
import {
  ArrowLeft, ArrowRight, BadgeCheck, Banknote, Bell, Building2, Check,
  CheckCircle2, ChevronLeft, CircleUserRound, Clock3, Droplets, Eye,
  EyeOff, FileCheck2, FileText, HeartHandshake, LayoutDashboard, LockKeyhole,
  LogIn, LogOut, Mail, MapPin, Menu, Phone, RefreshCw, Search, Settings,
  ShieldCheck, UserRound, UsersRound, X, XCircle, Edit3, Save, AlertTriangle,
  ClipboardList, Warehouse, CalendarDays, Activity, KeyRound, Home as HomeIcon,
} from 'lucide-react';

const routes = {
  home: '#/', register: '#/register', donor: '#/register/donor',
  organization: '#/register/organization', login: '#/login', forgot: '#/forgot-password',
  verify: '#/verify', success: '#/success', approvals: '#/supervisor/approvals',
  donorDashboard: '#/donor/dashboard', profile: '#/account/profile',
  institutionDashboard: '#/institution/dashboard', resubmit: '#/institution/resubmit',
  bloodRequests: '#/institution/blood-requests', bloodBank: '#/institution/blood-bank',
};

const bloodTypes = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
const governorates = ['القدس', 'رام الله والبيرة', 'الخليل', 'نابلس', 'بيت لحم', 'جنين', 'طولكرم', 'قلقيلية', 'سلفيت', 'أريحا والأغوار', 'طوباس', 'غزة'];

const requests = [
  { id: 'ORG-24018', name: 'مستشفى الأمل التخصصي', type: 'مستشفى', city: 'رام الله والبيرة', service: 'طلب الدم', date: 'اليوم، 09:35', status: 'pending', contact: 'سارة أحمد' },
  { id: 'ORG-24017', name: 'بنك دم الشفاء', type: 'مركز دم مستقل', city: 'نابلس', service: 'بنك الدم', date: 'أمس، 14:20', status: 'pending', contact: 'محمد خالد' },
  { id: 'ORG-24016', name: 'مستشفى الحياة المركزي', type: 'مستشفى مركزي', city: 'الخليل', service: 'الخدمتان', date: '15 سبتمبر 2026', status: 'needs', contact: 'رنا يوسف' },
  { id: 'ORG-24015', name: 'جمعية عطاء للدم', type: 'جمعية بنك دم', city: 'بيت لحم', service: 'بنك الدم', date: '14 سبتمبر 2026', status: 'approved', contact: 'ليان سمير' },
];

function navigate(path) {
  window.location.hash = path.replace('#', '');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Logo({ light = false }) {
  return <button className={`logo ${light ? 'logo-light' : ''}`} onClick={() => navigate(routes.home)} aria-label="الرئيسية">
    <span className="logo-mark"><Droplets size={24} strokeWidth={2.3} /></span>
    <span><strong>قطرة</strong><small>QATRA</small></span>
  </button>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="shell nav-wrap">
      <Logo />
      <nav className={open ? 'nav-open' : ''}>
        <button onClick={() => navigate(routes.home)}>الرئيسية</button>
        <button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>كيف تعمل قطرة؟</button>
        <button onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}>خدماتنا</button>
        <button onClick={() => navigate('#/campaigns')}>حملات التبرع</button>
        <button onClick={() => navigate('#/supervisor/dashboard')}>عرض لوحة المشرف</button>
      </nav>
      <div className="nav-actions">
        <button className="btn btn-ghost" onClick={() => navigate(routes.login)}>تسجيل الدخول</button>
        <button className="btn btn-primary" onClick={() => navigate(routes.register)}>إنشاء حساب <ArrowLeft size={17} /></button>
      </div>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="القائمة">{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function Footer() {
  return <footer className="footer"><div className="shell footer-grid">
    <div><Logo light /><p>منصة وطنية تسهّل وصول الدم لمن يحتاجه، وتربط المتبرعين بالمؤسسات الصحية بأمان وفاعلية.</p></div>
    <div><h4>روابط سريعة</h4><button onClick={() => navigate(routes.register)}>إنشاء حساب</button><button onClick={() => navigate(routes.login)}>تسجيل الدخول</button><button onClick={() => navigate(routes.approvals)}>لوحة المشرف التجريبية</button></div>
    <div><h4>الدعم</h4><span>help@qatra.ps</span><span dir="ltr">+970 2 000 0000</span><small>هذا نموذج MVP تجريبي — لا يتم إرسال بيانات حقيقية.</small></div>
  </div><div className="shell footer-bottom"><span>© 2026 منصة قطرة</span><span>الخصوصية · الشروط والأحكام</span></div></footer>;
}

function Home() {
  return <><Header /><main>
    <section className="hero"><div className="shell hero-grid">
      <div className="hero-copy"><div className="eyebrow"><span className="pulse-dot" /> منصة موثوقة وآمنة للتبرع بالدم</div>
        <h1>كل قطرة<br /><em>تصنع حياة.</em></h1>
        <p>نقرّب المسافة بين المتبرعين بالدم والمؤسسات الصحية، لنصل بالدم المناسب إلى من يحتاجه في الوقت المناسب.</p>
        <div className="hero-actions"><button className="btn btn-primary btn-lg" onClick={() => navigate(routes.donor)}>سجّل كمتبرع <HeartHandshake size={20} /></button><button className="btn btn-outline btn-lg" onClick={() => navigate(routes.organization)}>سجّل مؤسستك <Building2 size={20} /></button></div>
        <div className="trust-row"><span><ShieldCheck /> بياناتك محمية</span><span><BadgeCheck /> جهات معتمدة</span><span><Clock3 /> استجابة أسرع</span></div>
      </div>
      <div className="hero-visual" aria-label="شبكة قطرة">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="main-drop"><Droplets size={64} /><strong>قطرة حياة</strong><span>تبرعك يصنع فرقًا</span></div>
        <div className="float-card card-a"><span className="icon-bubble red"><HeartHandshake /></span><div><strong>متبرع جاهز</strong><small>O+ · رام الله</small></div><CheckCircle2 className="teal" /></div>
        <div className="float-card card-b"><span className="icon-bubble navy"><Building2 /></span><div><strong>طلب دم عاجل</strong><small>3 وحدات · A−</small></div><span className="urgent">عاجل</span></div>
        <div className="float-card card-c"><span className="mini-avatars"><i>م</i><i>ر</i><i>ل</i></span><div><strong>+1,200</strong><small>متبرع في الشبكة</small></div></div>
      </div>
    </div></section>

    <section className="stats"><div className="shell stats-grid"><div><strong>1,200+</strong><span>متبرع مسجّل</span></div><div><strong>48</strong><span>مؤسسة صحية</span></div><div><strong>320</strong><span>تبرعًا ناجحًا</span></div><div><strong>8</strong><span>فصائل دم</span></div></div></section>

    <section id="roles" className="section"><div className="shell"><div className="section-title"><span>ابدأ من هنا</span><h2>كيف تريد الانضمام إلى قطرة؟</h2><p>اختر نوع الحساب المناسب لك، وسنرشدك خلال خطوات التسجيل.</p></div>
      <div className="role-cards"><article className="role-card donor-card"><div className="role-icon"><HeartHandshake /></div><span className="role-tag">للأفراد</span><h3>متبرع بالدم</h3><p>استقبل نداءات التبرع المتوافقة مع فصيلة دمك ومنطقتك، وساهم في إنقاذ حياة.</p><ul><li><Check /> نداءات مناسبة لفصيلتك</li><li><Check /> تحكم كامل بحالة توفرك</li><li><Check /> سجل تبرعاتك في مكان واحد</li></ul><button className="btn btn-primary full" onClick={() => navigate(routes.donor)}>إنشاء حساب متبرع <ArrowLeft /></button></article>
      <article className="role-card org-card"><div className="role-icon"><Building2 /></div><span className="role-tag">للجهات الصحية</span><h3>مؤسسة صحية أو بنك دم</h3><p>أدر طلبات الدم والمخزون واستقبل المتبرعين ضمن شبكة صحية معتمدة.</p><ul><li><Check /> إنشاء ومتابعة طلبات الدم</li><li><Check /> إدارة مخزون وحدات الدم</li><li><Check /> الوصول إلى شبكة المتبرعين</li></ul><button className="btn btn-dark full" onClick={() => navigate(routes.organization)}>تسجيل مؤسسة <ArrowLeft /></button></article></div>
    </div></section>

    <section id="how" className="section how-section"><div className="shell"><div className="section-title"><span>رحلة بسيطة</span><h2>ثلاث خطوات تفصلنا عن إنقاذ حياة</h2></div><div className="steps"><div><b>01</b><span><UserRound /></span><h3>أنشئ حسابك</h3><p>سجّل بياناتك الأساسية وحدد دورك في المنصة.</p></div><div><b>02</b><span><BadgeCheck /></span><h3>فعّل الحساب</h3><p>تحقق من رقم هاتفك، وللمؤسسات تتم مراجعة الاعتماد.</p></div><div><b>03</b><span><Droplets /></span><h3>ابدأ المساهمة</h3><p>استقبل النداءات أو أدر احتياج مؤسستك من الدم.</p></div></div></div></section>
    <section className="cta-section"><div className="shell cta-box"><div><span>جاهز لتصنع فرقًا؟</span><h2>تبرعك اليوم قد يكون أمل شخص غدًا.</h2></div><button className="btn btn-light btn-lg" onClick={() => navigate(routes.register)}>انضم إلى قطرة <ArrowLeft /></button></div></section>
  </main><Footer /></>;
}

function AuthShell({ title, subtitle, children, aside = 'donor' }) {
  return <div className="auth-page"><div className="auth-main"><div className="auth-top"><Logo /><button className="back-link" onClick={() => history.back()}><ArrowRight /> رجوع</button></div><div className="auth-container"><div className="auth-heading"><h1>{title}</h1><p>{subtitle}</p></div>{children}</div></div>
    <aside className={`auth-aside ${aside}`}><div className="aside-overlay" /><div className="aside-content"><Logo light /><div className="aside-quote"><Droplets /><h2>{aside === 'org' ? 'معًا نبني شبكة دم أكثر كفاءة.' : 'قرار بسيط منك، قد يمنح شخصًا حياة كاملة.'}</h2><p>{aside === 'org' ? 'انضموا إلى شبكة المؤسسات الصحية المعتمدة وساهموا في تسريع وصول الدم.' : 'انضم إلى آلاف المتبرعين الذين يصنعون فرقًا حقيقيًا كل يوم.'}</p></div><div className="aside-proof"><div className="mini-avatars"><i>أ</i><i>س</i><i>ن</i><i>+</i></div><span><strong>1,200+ متبرع</strong><small>انضموا إلى قطرة حتى الآن</small></span></div></div></aside></div>;
}

function RegisterChoice() {
  return <AuthShell title="مرحبًا بك في قطرة" subtitle="اختر نوع الحساب الذي ترغب بإنشائه لنخصص تجربتك."><div className="choice-grid"><button className="choice-card" onClick={() => navigate(routes.donor)}><span className="choice-icon"><HeartHandshake /></span><div><small>حساب فردي</small><h3>متبرع بالدم</h3><p>أرغب في استقبال نداءات التبرع والمساعدة عند الحاجة.</p></div><ChevronLeft /></button><button className="choice-card" onClick={() => navigate(routes.organization)}><span className="choice-icon navy"><Building2 /></span><div><small>حساب جهة</small><h3>مؤسسة صحية أو بنك دم</h3><p>أرغب في إدارة طلبات الدم أو المخزون والتبرعات.</p></div><ChevronLeft /></button></div><p className="auth-switch">لديك حساب بالفعل؟ <button onClick={() => navigate(routes.login)}>تسجيل الدخول</button></p></AuthShell>;
}

function Field({ label, icon: Icon, error, hint, children, required = true, ...props }) {
  return <label className={`field ${error ? 'field-error' : ''}`}><span>{label}{required && <b>*</b>}</span><div className="input-wrap">{Icon && <Icon size={19} />}{children || <input {...props} />}</div>{error && <small className="error-text"><XCircle />{error}</small>}{hint && !error && <small className="hint">{hint}</small>}</label>;
}

function PasswordField({ label = 'كلمة المرور', value, onChange, error }) {
  const [show, setShow] = useState(false);
  return <Field label={label} icon={LockKeyhole} error={error}><input type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder="8 أحرف على الأقل" /><button type="button" className="eye" onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</button></Field>;
}

function Progress({ current, labels }) {
  return <div className="form-progress">{labels.map((label, i) => <div className={i + 1 <= current ? 'active' : ''} key={label}><span>{i + 1 < current ? <Check /> : i + 1}</span><small>{label}</small></div>)}</div>;
}

function DonorRegister() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', blood: '', governorate: '', terms: false });
  const [errors, setErrors] = useState({});
  const set = (key, value) => setForm({ ...form, [key]: value });
  const submit = (e) => { e.preventDefault(); const next = {}; if (!form.name.trim()) next.name = 'أدخل الاسم الكامل'; if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'أدخل بريدًا إلكترونيًا صحيحًا'; if (form.phone.replace(/\D/g, '').length < 9) next.phone = 'أدخل رقم هاتف صحيحًا'; if (form.password.length < 8) next.password = 'يجب ألا تقل كلمة المرور عن 8 أحرف'; if (form.password !== form.confirm) next.confirm = 'كلمتا المرور غير متطابقتين'; if (!form.blood) next.blood = 'اختر فصيلة الدم'; if (!form.governorate) next.governorate = 'اختر المحافظة'; if (!form.terms) next.terms = 'الموافقة مطلوبة للمتابعة'; setErrors(next); if (!Object.keys(next).length) navigate('#/verify?type=donor'); };
  return <AuthShell title="أنشئ حساب متبرع" subtitle="املأ بياناتك الأساسية لتصبح جزءًا من شبكة قطرة."><Progress current={1} labels={['البيانات', 'التحقق', 'تم التسجيل']} /><form className="auth-form" onSubmit={submit} noValidate><div className="form-grid"><Field label="الاسم الكامل" icon={UserRound} error={errors.name}><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="الاسم كما يظهر في الهوية" /></Field><Field label="البريد الإلكتروني" icon={Mail} error={errors.email}><input dir="ltr" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@example.com" /></Field><Field label="رقم الهاتف" icon={Phone} error={errors.phone}><input dir="ltr" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+970 5X XXX XXXX" /></Field><Field label="المحافظة" icon={MapPin} error={errors.governorate}><select value={form.governorate} onChange={e => set('governorate', e.target.value)}><option value="">اختر المحافظة</option>{governorates.map(x => <option key={x}>{x}</option>)}</select></Field></div><Field label="فصيلة الدم" error={errors.blood}><div className="blood-picker">{bloodTypes.map(x => <button type="button" className={form.blood === x ? 'selected' : ''} onClick={() => set('blood', x)} key={x}>{x}</button>)}</div></Field><div className="form-grid"><PasswordField value={form.password} onChange={e => set('password', e.target.value)} error={errors.password} /><PasswordField label="تأكيد كلمة المرور" value={form.confirm} onChange={e => set('confirm', e.target.value)} error={errors.confirm} /></div><label className={`check-line ${errors.terms ? 'has-error' : ''}`}><input type="checkbox" checked={form.terms} onChange={e => set('terms', e.target.checked)} /><span>أوافق على <u>شروط الاستخدام</u> و<u>سياسة الخصوصية</u>.</span></label>{errors.terms && <small className="error-text"><XCircle />{errors.terms}</small>}<button className="btn btn-primary btn-lg full" type="submit">إنشاء الحساب والمتابعة <ArrowLeft /></button></form><p className="auth-switch">لديك حساب؟ <button onClick={() => navigate(routes.login)}>تسجيل الدخول</button></p></AuthShell>;
}

function OrganizationRegister() {
  const [step, setStep] = useState(1); const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ orgName: '', orgType: '', governorate: '', address: '', orgPhone: '', orgEmail: '', manager: '', job: '', managerPhone: '', managerEmail: '', services: [], password: '', terms: false });
  const set = (k, v) => setForm({ ...form, [k]: v }); const toggle = s => set('services', form.services.includes(s) ? form.services.filter(x => x !== s) : [...form.services, s]);
  if (submitted) return <AuthShell aside="org" title="تم استلام طلبكم" subtitle="طلب تسجيل المؤسسة الآن قيد مراجعة الجهة الصحية."><div className="success-panel"><span><FileCheck2 /></span><h3>رقم الطلب: ORG-24019</h3><p>أرسلنا تأكيدًا إلى البريد الإلكتروني المسجل. يمكنكم متابعة حالة الاعتماد بعد تسجيل الدخول.</p><div className="status-note"><Clock3 /><div><strong>قيد المراجعة</strong><small>المدة التقديرية للمراجعة: 1–3 أيام عمل</small></div></div><button className="btn btn-primary full" onClick={() => navigate(routes.login)}>العودة لتسجيل الدخول</button></div></AuthShell>;
  return <AuthShell aside="org" title="سجّل مؤسستك في قطرة" subtitle="سنراجع بيانات المؤسسة ووثائقها قبل تفعيل الخدمات."><Progress current={step} labels={['المؤسسة', 'المسؤول والخدمات', 'المراجعة']} />
    <form className="auth-form" onSubmit={e => { e.preventDefault(); if (step < 3) setStep(step + 1); else setSubmitted(true); }}>
      {step === 1 && <><div className="form-grid"><Field label="اسم المؤسسة" icon={Building2}><input required value={form.orgName} onChange={e => set('orgName', e.target.value)} placeholder="الاسم الرسمي للمؤسسة" /></Field><Field label="نوع المؤسسة" icon={Building2}><select required value={form.orgType} onChange={e => set('orgType', e.target.value)}><option value="">اختر النوع</option>{['مستشفى', 'مستشفى مركزي', 'مستشفى ميداني', 'مركز صحي', 'جمعية بنك دم', 'مركز دم مستقل'].map(x => <option key={x}>{x}</option>)}</select></Field><Field label="المحافظة" icon={MapPin}><select required value={form.governorate} onChange={e => set('governorate', e.target.value)}><option value="">اختر المحافظة</option>{governorates.map(x => <option key={x}>{x}</option>)}</select></Field><Field label="العنوان التفصيلي" icon={MapPin}><input required value={form.address} onChange={e => set('address', e.target.value)} placeholder="المدينة، الشارع" /></Field><Field label="هاتف المؤسسة" icon={Phone}><input required dir="ltr" value={form.orgPhone} onChange={e => set('orgPhone', e.target.value)} placeholder="+970 2 XXX XXXX" /></Field><Field label="البريد الرسمي" icon={Mail}><input required dir="ltr" value={form.orgEmail} onChange={e => set('orgEmail', e.target.value)} placeholder="info@hospital.ps" /></Field></div></>}
      {step === 2 && <><h3 className="form-section-title">بيانات المسؤول</h3><div className="form-grid"><Field label="الاسم الكامل" icon={UserRound}><input required value={form.manager} onChange={e => set('manager', e.target.value)} placeholder="اسم ممثل المؤسسة" /></Field><Field label="المسمى الوظيفي" icon={CircleUserRound}><input required value={form.job} onChange={e => set('job', e.target.value)} placeholder="مثال: المدير الطبي" /></Field><Field label="رقم الهاتف" icon={Phone}><input required dir="ltr" value={form.managerPhone} onChange={e => set('managerPhone', e.target.value)} placeholder="+970 5X XXX XXXX" /></Field><Field label="البريد الإلكتروني" icon={Mail}><input required dir="ltr" value={form.managerEmail} onChange={e => set('managerEmail', e.target.value)} placeholder="manager@hospital.ps" /></Field></div><h3 className="form-section-title">الخدمات المطلوبة</h3><div className="service-options"><button type="button" className={form.services.includes('request') ? 'selected' : ''} onClick={() => toggle('request')}><Banknote /><span><strong>خدمة طلب الدم</strong><small>إنشاء الطلبات ومتابعتها</small></span><i>{form.services.includes('request') && <Check />}</i></button><button type="button" className={form.services.includes('bank') ? 'selected' : ''} onClick={() => toggle('bank')}><Droplets /><span><strong>خدمة بنك الدم</strong><small>المخزون واستقبال المتبرعين</small></span><i>{form.services.includes('bank') && <Check />}</i></button></div><label className="upload-box"><FileText /><strong>وثيقة الترخيص أو الاعتماد</strong><small>PDF أو صورة، بحد أقصى 5MB</small><input type="file" hidden /><span>اختيار ملف</span></label></>}
      {step === 3 && <><div className="review-card"><div><span>بيانات المؤسسة</span><button type="button" onClick={() => setStep(1)}>تعديل</button></div><dl><dt>اسم المؤسسة</dt><dd>{form.orgName || 'مستشفى الأمل التخصصي'}</dd><dt>النوع والموقع</dt><dd>{form.orgType || 'مستشفى'} · {form.governorate || 'رام الله والبيرة'}</dd><dt>التواصل</dt><dd>{form.orgEmail || 'info@alamal.ps'}</dd></dl></div><div className="review-card"><div><span>المسؤول والخدمات</span><button type="button" onClick={() => setStep(2)}>تعديل</button></div><dl><dt>المسؤول</dt><dd>{form.manager || 'سارة أحمد'} · {form.job || 'المديرة الطبية'}</dd><dt>الخدمات</dt><dd>{form.services.length ? form.services.map(x => x === 'request' ? 'طلب الدم' : 'بنك الدم').join('، ') : 'طلب الدم'}</dd><dt>الوثيقة</dt><dd className="file-ok"><FileCheck2 /> ترخيص-المؤسسة.pdf</dd></dl></div><div className="review-notice"><ShieldCheck /><p><strong>ماذا يحدث بعد الإرسال؟</strong><br />سيتحقق مشرف الجهة الصحية من البيانات والوثائق، وستصلكم نتيجة المراجعة عبر البريد.</p></div><label className="check-line"><input required type="checkbox" checked={form.terms} onChange={e => set('terms', e.target.checked)} /><span>أقر بصحة البيانات وأوافق على الشروط وسياسة الخصوصية.</span></label></>}
      <div className="form-nav">{step > 1 && <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}><ArrowRight /> السابق</button>}<button className="btn btn-primary" type="submit">{step === 3 ? 'إرسال طلب التسجيل' : 'حفظ والمتابعة'} <ArrowLeft /></button></div>
    </form></AuthShell>;
}

function LegacyLogin() {
  const [show, setShow] = useState(false); const [role, setRole] = useState('donor'); const [loading, setLoading] = useState(false);
  const submit = e => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); localStorage.setItem('qatraDemoRole', role); if (role === 'supervisor') navigate('#/supervisor/dashboard'); else if (role === 'organization') navigate(routes.institutionDashboard); else navigate(routes.donorDashboard); }, 700); };
  return <AuthShell title="أهلًا بعودتك" subtitle="سجّل دخولك للوصول إلى حسابك وخدماتك."><form className="auth-form login-form" onSubmit={submit}><div className="demo-hint"><BadgeCheck /><div><strong>جرّب لوحة المشرف</strong><small>اختر «مشرف الجهة الصحية» ثم سجّل الدخول بأي بيانات.</small></div></div><Field label="البريد الإلكتروني أو رقم الهاتف" icon={Mail}><input required placeholder="name@example.com" /></Field><Field label="كلمة المرور" icon={LockKeyhole}><input required type={show ? 'text' : 'password'} placeholder="أدخل كلمة المرور" /><button type="button" className="eye" onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</button></Field><div className="login-meta"><label className="check-line"><input type="checkbox" /><span>تذكرني</span></label><button type="button" onClick={() => navigate(routes.forgot)}>نسيت كلمة المرور؟</button></div><label className="field"><span>الدور التجريبي</span><div className="input-wrap"><ShieldCheck /><select value={role} onChange={e => setRole(e.target.value)}><option value="donor">متبرع بالدم</option><option value="organization">مؤسسة صحية</option><option value="supervisor">مشرف الجهة الصحية</option></select></div></label><button className="btn btn-primary btn-lg full" disabled={loading}>{loading ? <><RefreshCw className="spin" /> جاري الدخول...</> : <>تسجيل الدخول <LogIn /></>}</button></form><p className="auth-switch">ليس لديك حساب؟ <button onClick={() => navigate(routes.register)}>أنشئ حسابًا جديدًا</button></p></AuthShell>;
}

const demoAccounts = [
  { id: 'supervisor', name: 'محمود سالم', email: 'supervisor@qatra.ps', label: 'مشرف الجهة الصحية', description: 'الإشراف والاعتمادات والتقارير', role: 'supervisor', icon: ShieldCheck, path: '#/supervisor/dashboard' },
  { id: 'org-both', name: 'مستشفى الحياة المركزي', email: 'hayat@qatra.ps', label: 'مؤسسة · الخدمتان', description: 'طلب الدم + بنك الدم', role: 'organization', services: ['request', 'bank'], icon: Building2, path: routes.institutionDashboard },
  { id: 'org-request', name: 'مستشفى الأمل التخصصي', email: 'alamal@qatra.ps', label: 'مؤسسة · طلب الدم', description: 'إنشاء طلبات الدم ومتابعتها', role: 'organization', services: ['request'], icon: ClipboardList, path: routes.institutionDashboard },
  { id: 'org-bank', name: 'بنك دم الشفاء', email: 'shifa@qatra.ps', label: 'مؤسسة · بنك الدم', description: 'المخزون والطلبات الواردة', role: 'organization', services: ['bank'], icon: Warehouse, path: routes.institutionDashboard },
  { id: 'donor', name: 'أحمد خالد', email: 'donor@qatra.ps', label: 'متبرع بالدم', description: 'النداءات والحملات وسجل التبرعات', role: 'donor', icon: HeartHandshake, path: routes.donorDashboard },
];

function QuickDemoLogin() {
  const [open, setOpen] = useState(true);
  const loginAs = account => {
    localStorage.setItem('qatraDemoRole', account.role);
    localStorage.setItem('qatraDemoAccount', JSON.stringify({ id: account.id, name: account.name, email: account.email, label: account.label }));
    if (account.role === 'organization') {
      localStorage.setItem('qatraOrgStatus', 'approved');
      localStorage.setItem('qatraOrgServices', JSON.stringify(account.services));
    }
    navigate(account.path);
  };
  return <div className={`quick-demo-login ${open ? 'open' : ''}`}>
    <button className="quick-demo-trigger" onClick={() => setOpen(!open)}><KeyRound /><span><strong>دخول تجريبي سريع</strong><small>5 حسابات جاهزة للفريق</small></span><ChevronLeft /></button>
    {open && <div className="quick-demo-panel"><header><div><small>بيئة العرض</small><h2>اختر الحساب التجريبي</h2><p>لا تحتاج إلى كلمة مرور.</p></div><button onClick={() => setOpen(false)}><X /></button></header><div className="quick-demo-list">{demoAccounts.map(account => { const Icon = account.icon; return <button key={account.id} onClick={() => loginAs(account)}><span className={`demo-account-icon ${account.role}`}><Icon /></span><span><strong>{account.name}</strong><small>{account.label} · {account.description}</small><em dir="ltr">{account.email}</em></span><LogIn /></button>; })}</div><footer><KeyRound /> كلمة المرور التجريبية عند الإدخال اليدوي: <b dir="ltr">demo1234</b></footer></div>}
  </div>;
}

function Login() { return <><LegacyLogin /><QuickDemoLogin /></>; }

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return <AuthShell title={sent ? 'تحقق من بريدك' : 'استعادة كلمة المرور'} subtitle={sent ? 'أرسلنا رمز الاستعادة إلى وسيلة التواصل المسجلة.' : 'أدخل بريدك الإلكتروني أو رقم هاتفك وسنرسل لك رمز الاستعادة.'}>{sent ? <div className="success-panel compact"><span><Mail /></span><h3 dir="ltr">m••••@example.com</h3><p>الرمز صالح لمدة 10 دقائق. لم يصلك؟ يمكنك إعادة الإرسال بعد 00:48.</p><div className="otp"><input maxLength="1" autoFocus /><input maxLength="1" /><input maxLength="1" /><input maxLength="1" /><input maxLength="1" /><input maxLength="1" /></div><button className="btn btn-primary full" onClick={() => navigate(routes.login)}>تحقق والمتابعة</button><button className="text-btn"><RefreshCw /> إعادة إرسال الرمز</button></div> : <form className="auth-form login-form" onSubmit={e => { e.preventDefault(); setSent(true); }}><div className="recovery-icon"><LockKeyhole /></div><Field label="البريد الإلكتروني أو رقم الهاتف" icon={Mail}><input required placeholder="name@example.com أو +970..." /></Field><button className="btn btn-primary btn-lg full">إرسال رمز الاستعادة <ArrowLeft /></button><button type="button" className="text-btn" onClick={() => navigate(routes.login)}><ArrowRight /> العودة إلى تسجيل الدخول</button></form>}</AuthShell>;
}

function Verify() {
  const [seconds, setSeconds] = useState(48); useEffect(() => { const timer = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000); return () => clearInterval(timer); }, []);
  return <AuthShell title="تحقق من رقم هاتفك" subtitle="أدخل الرمز المكوّن من 6 أرقام الذي أرسلناه إليك."><Progress current={2} labels={['البيانات', 'التحقق', 'تم التسجيل']} /><div className="success-panel compact"><span><Phone /></span><p>تم إرسال الرمز إلى</p><h3 dir="ltr">+970 59 ••• ••42</h3><div className="otp"><input maxLength="1" autoFocus /><input maxLength="1" /><input maxLength="1" /><input maxLength="1" /><input maxLength="1" /><input maxLength="1" /></div><button className="btn btn-primary btn-lg full" onClick={() => navigate(routes.success)}>تأكيد الرمز</button><button className="text-btn" disabled={seconds > 0}><RefreshCw /> {seconds ? `إعادة الإرسال خلال 00:${String(seconds).padStart(2, '0')}` : 'إعادة إرسال الرمز'}</button><small>يمكنك تعديل رقم الهاتف بالعودة إلى الخطوة السابقة.</small></div></AuthShell>;
}

function Success() {
  return <AuthShell title="أهلًا بك في قطرة!" subtitle="تم إنشاء حسابك وتفعيله بنجاح."><Progress current={3} labels={['البيانات', 'التحقق', 'تم التسجيل']} /><div className="success-panel"><span className="success-check"><Check /></span><h2>أصبحت جزءًا من شبكة العطاء</h2><p>سنرسل لك نداءات التبرع المناسبة لفصيلة دمك ومنطقتك، ويمكنك التحكم بحالة توفرك في أي وقت.</p><button className="btn btn-primary btn-lg full" onClick={() => navigate(routes.home)}>الذهاب إلى الصفحة الرئيسية <ArrowLeft /></button></div></AuthShell>;
}

function StatusBadge({ status }) { const map = { pending: ['قيد المراجعة', Clock3], approved: ['معتمدة', CheckCircle2], needs: ['تحتاج استكمال', RefreshCw], rejected: ['مرفوضة', XCircle] }; const [label, Icon] = map[status]; return <span className={`status ${status}`}><Icon />{label}</span>; }

function ApprovalsLegacy() {
  const [selected, setSelected] = useState(null); const [items, setItems] = useState(requests); const [query, setQuery] = useState('');
  const filtered = useMemo(() => items.filter(x => x.name.includes(query) || x.id.toLowerCase().includes(query.toLowerCase())), [items, query]);
  const act = status => { setItems(items.map(x => x.id === selected.id ? { ...x, status } : x)); setSelected({ ...selected, status }); };
  if (localStorage.getItem('qatraDemoRole') !== 'supervisor') return <SupervisorGuard />;
  return <div className="dashboard"><aside className="sidebar"><Logo light /><nav><button><LayoutDashboard /> نظرة عامة</button><button className="active"><FileCheck2 /> طلبات الاعتماد <b>3</b></button><button><Building2 /> المؤسسات</button><button><UsersRound /> المستخدمون</button><button><FileText /> سجل القرارات</button></nav><div className="side-user"><span>مس</span><div><strong>محمود سالم</strong><small>مشرف الجهة الصحية</small></div></div></aside>
    <main className="dash-main"><header className="dash-header"><div><button className="mobile-logo"><Menu /></button><h1>طلبات اعتماد المؤسسات</h1><p>راجع بيانات المؤسسات والخدمات المطلوبة واتخذ القرار المناسب.</p></div><div className="dash-actions"><button onClick={() => navigate('#/notifications?role=supervisor')}><Bell /><i>1</i></button><button onClick={() => navigate(routes.home)}><ArrowRight /> مغادرة العرض</button></div></header>
      <div className="kpis"><article><span className="amber"><Clock3 /></span><div><small>بانتظار المراجعة</small><strong>12</strong><em>+3 هذا الأسبوع</em></div></article><article><span className="green"><CheckCircle2 /></span><div><small>مؤسسات معتمدة</small><strong>48</strong><em>+8 هذا الشهر</em></div></article><article><span className="blue"><Building2 /></span><div><small>إجمالي المؤسسات</small><strong>67</strong><em>في 11 محافظة</em></div></article></div>
      <section className="data-card"><div className="data-toolbar"><div className="tabs"><button className="active">الكل <b>67</b></button><button>قيد المراجعة <b>12</b></button><button>تحتاج استكمال <b>4</b></button><button>معتمدة <b>48</b></button></div><div className="search"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث باسم المؤسسة أو رقم الطلب" /></div></div>
        <div className="table-wrap"><table><thead><tr><th>المؤسسة</th><th>نوع المؤسسة</th><th>المحافظة</th><th>الخدمات المطلوبة</th><th>تاريخ التقديم</th><th>الحالة</th><th></th></tr></thead><tbody>{filtered.map(x => <tr key={x.id}><td><div className="org-cell"><span><Building2 /></span><div><strong>{x.name}</strong><small>{x.id}</small></div></div></td><td>{x.type}</td><td>{x.city}</td><td><span className="service-tag">{x.service}</span></td><td>{x.date}</td><td><StatusBadge status={x.status} /></td><td><button className="row-action" onClick={() => setSelected(x)}>مراجعة <ChevronLeft /></button></td></tr>)}</tbody></table></div>
      </section>
    </main>
    {selected && <div className="drawer-backdrop" onClick={() => setSelected(null)}><aside className="review-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><small>{selected.id}</small><h2>مراجعة طلب الاعتماد</h2></div><button onClick={() => setSelected(null)}><X /></button></div><div className="drawer-body"><div className="institution-head"><span><Building2 /></span><div><h3>{selected.name}</h3><p>{selected.type} · {selected.city}</p></div><StatusBadge status={selected.status} /></div><div className="info-section"><h4>بيانات المؤسسة</h4><dl><dt>العنوان</dt><dd>{selected.city}، شارع الإرسال</dd><dt>رقم الهاتف</dt><dd dir="ltr">+970 2 240 1234</dd><dt>البريد الرسمي</dt><dd dir="ltr">info@organization.ps</dd><dt>رقم الترخيص</dt><dd>MOH-2026-1842</dd></dl></div><div className="info-section"><h4>الممثل الرسمي</h4><dl><dt>الاسم</dt><dd>{selected.contact}</dd><dt>المسمى الوظيفي</dt><dd>المدير الطبي</dd><dt>رقم الهاتف</dt><dd dir="ltr">+970 59 123 4567</dd></dl></div><div className="info-section"><h4>الخدمات المطلوبة</h4><div className="approved-services"><span><Check /> {selected.service}</span></div></div><div className="license-file"><FileText /><div><strong>وثيقة الترخيص.pdf</strong><small>2.4 MB · تم رفعها مع الطلب</small></div><button>عرض</button></div><label className="field"><span>ملاحظة القرار <b>*</b></span><div className="input-wrap"><textarea placeholder="أضف ملاحظة توضح قرارك..." /></div></label></div><div className="drawer-actions"><button className="btn reject" onClick={() => act('rejected')}><XCircle /> رفض الطلب</button><button className="btn btn-outline" onClick={() => act('needs')}><RefreshCw /> طلب استكمال</button><button className="btn approve" onClick={() => act('approved')}><CheckCircle2 /> اعتماد المؤسسة</button></div></aside></div>}
  </div>;
}

function Approvals() {
  return <SupervisorPortal active="approvals">
    <div className="supervisor-content approvals-page">
      <div className="supervisor-page-head">
        <div><small>إدارة المؤسسات</small><h1>طلبات اعتماد المؤسسات</h1><p>راجع بيانات المؤسسات والخدمات المطلوبة واتخذ القرار المناسب.</p></div>
      </div>
      <div className="approvals-embedded"><ApprovalsLegacy /></div>
    </div>
  </SupervisorPortal>;
}

function NotFound() { return <div className="not-found"><Logo /><Droplets /><h1>الصفحة غير موجودة</h1><button className="btn btn-primary" onClick={() => navigate(routes.home)}>العودة للرئيسية</button></div>; }

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  useEffect(() => { const change = () => setRoute(window.location.hash || '#/'); window.addEventListener('hashchange', change); return () => window.removeEventListener('hashchange', change); }, []);
  const path = route.split('?')[0];
  const pages = { '#/': Home, '#/register': RegisterChoice, '#/register/donor': DonorRegister, '#/register/organization': OrganizationRegister, '#/login': Login, '#/forgot-password': ForgotPassword, '#/verify': Verify, '#/success': Success, '#/supervisor/dashboard': SupervisorDashboardEnhanced, '#/supervisor/institutions': SupervisorInstitutions, '#/supervisor/approvals': Approvals, '#/supervisor/blood-banks': SupervisorBloodBanks, '#/supervisor/requests': SupervisorRequests, '#/supervisor/donors': SupervisorDonors, '#/supervisor/activity': SupervisorActivity, '#/supervisor/reports': SupervisorReports, '#/donor/dashboard': DonorCalls, '#/donor/calls/details': DonorCallDetails, '#/donor/donations': DonationHistory, '#/account/profile': Profile, '#/institution/dashboard': InstitutionDashboard, '#/institution/resubmit': ResubmitApplication, '#/institution/blood-requests': BloodRequests, '#/institution/blood-requests/new': CreateBloodRequest, '#/institution/blood-requests/details': BloodRequestDetails, '#/institution/blood-requests/edit': EditBloodRequest, '#/institution/blood-bank': BankDashboard, '#/institution/blood-bank/inventory': Inventory, '#/institution/blood-bank/alerts': InventoryAlerts, '#/institution/blood-bank/requests': IncomingRequests, '#/institution/blood-bank/requests/details': BankRequestDetails, '#/donation-calls': DonationCallsManagement, '#/donation-calls/new': CreateDonationCall, '#/donation-calls/target': TargetDonors, '#/donation-calls/responses': CallResponses, '#/donation-calls/record-donation': RecordDonation, '#/campaigns': PublicCampaigns, '#/campaigns/details': CampaignDetails, '#/institution/campaigns': InstitutionCampaigns, '#/institution/campaigns/new': CampaignForm, '#/institution/campaigns/edit': CampaignForm, '#/institution/campaigns/participants': CampaignParticipants, '#/notifications': NotificationCenter };
  pages['#/supervisor/activity'] = SupervisorActivityEnhanced;
  pages['#/supervisor/institutions'] = SupervisorInstitutionsEnhanced;
  pages['#/supervisor/requests'] = SupervisorRequestsEnhanced;
  pages['#/supervisor/donors'] = SupervisorDonorsEnhanced;
  // Keep the established UI routes while accepting the canonical Sprint 7 deep links.
  const supervisorAliases = {
    '#/supervisor': '#/supervisor/dashboard',
    '#/supervisor/donations': '#/supervisor/donors',
    '#/supervisor/campaigns': '#/supervisor/activity',
    '#/supervisor/donation-calls': '#/supervisor/activity',
  };
  const Page = pages[supervisorAliases[path] || path] || NotFound;
  return <Page />;
}
