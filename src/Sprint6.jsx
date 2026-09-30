import { useMemo, useState } from 'react';
import {
  AlertTriangle, ArrowLeft, ArrowRight, BadgeCheck, Bell, Building2, CalendarDays,
  Check, CheckCircle2, ChevronLeft, CircleX, Clock3, Droplets, Edit3, Filter,
  Info, LockKeyhole, MapPin, Megaphone, Plus, Search, ShieldCheck, Trash2,
  UserCheck, UsersRound, X
} from 'lucide-react';
import { Portal, getOrg } from './Sprint2';

const go = path => {
  window.location.hash = path.replace('#', '');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const bloodTypes = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
const governorates = ['القدس', 'رام الله والبيرة', 'الخليل', 'نابلس', 'بيت لحم', 'جنين'];
const statusLabels = { draft: 'مسودة', upcoming: 'قادمة', active: 'جارية', completed: 'مكتملة', cancelled: 'ملغاة' };
const participationLabels = { registered: 'مسجل', cancelled: 'ألغى المشاركة', attended: 'حضر', donated: 'تبرع فعليًا' };

const seedCampaigns = [
  { id: 'CP-2026-0031', title: 'حملة قطرة حياة', institution: 'مستشفى الأمل التخصصي', description: 'حملة مجتمعية لدعم مخزون بنك الدم واستقبال المتبرعين ضمن بيئة منظمة وآمنة.', date: '2026-09-24', start: '09:00', end: '15:00', governorate: 'رام الله والبيرة', area: 'رام الله', location: 'قاعة بلدية رام الله — المدخل الشرقي', blood: ['O+', 'O−', 'A+'], target: 60, status: 'upcoming', owner: 'ORG-24018', created: '17 سبتمبر 2026' },
  { id: 'CP-2026-0028', title: 'معًا ننقذ حياة', institution: 'بنك دم الشفاء', description: 'يوم مفتوح للتبرع بالدم لجميع الفصائل بالتعاون مع مؤسسات المجتمع المحلي.', date: '2026-09-19', start: '10:00', end: '17:00', governorate: 'نابلس', area: 'نابلس', location: 'مركز بلدية نابلس الثقافي', blood: bloodTypes, target: 100, status: 'active', owner: 'ORG-24017', created: '12 سبتمبر 2026' },
  { id: 'CP-2026-0019', title: 'تبرعك أمل', institution: 'مستشفى الأمل التخصصي', description: 'حملة سابقة لدعم احتياجات أقسام الطوارئ والعمليات.', date: '2026-08-27', start: '09:00', end: '14:00', governorate: 'رام الله والبيرة', area: 'البيرة', location: 'مركز شباب البيرة', blood: ['A+', 'B+', 'AB+', 'O+'], target: 45, status: 'completed', owner: 'ORG-24018', created: '10 أغسطس 2026' }
];
const seedParticipants = [
  { campaignId: 'CP-2026-0031', donorId: 'D-1001', name: 'أحمد خالد', blood: 'O+', area: 'رام الله', status: 'registered', registeredAt: 'اليوم، 11:20' },
  { campaignId: 'CP-2026-0031', donorId: 'D-1002', name: 'سارة محمود', blood: 'O+', area: 'البيرة', status: 'registered', registeredAt: 'اليوم، 10:05' },
  { campaignId: 'CP-2026-0031', donorId: 'D-1005', name: 'رامي سمير', blood: 'A−', area: 'رام الله', status: 'cancelled', registeredAt: 'أمس، 16:40' },
  { campaignId: 'CP-2026-0019', donorId: 'D-1001', name: 'أحمد خالد', blood: 'O+', area: 'رام الله', status: 'donated', registeredAt: '20 أغسطس 2026', donationId: 'DN-0042' }
];
const seedNotifications = {
  donor: [
    { id: 'N-D-14', type: 'campaign', title: 'حملة مناسبة لفصيلتك', message: 'حملة قطرة حياة تستقبل متبرعي O+ في رام الله.', at: 'منذ 12 دقيقة', read: false, link: '#/campaigns/details?id=CP-2026-0031&role=donor' },
    { id: 'N-D-13', type: 'call', title: 'نداء تبرع مباشر', message: 'يوجد نداء تبرع عاجل مناسب لك.', at: 'منذ ساعتين', read: false, link: '#/donor/calls/details?id=DC-2026-0084' },
    { id: 'N-D-12', type: 'reminder', title: 'تذكير بموعد الحملة', message: 'موعد حملة تبرعك أمل غدًا الساعة 9:00 صباحًا.', at: '27 أغسطس', read: true, link: '#/campaigns/details?id=CP-2026-0019&role=donor' }
  ],
  organization: [
    { id: 'N-O-18', type: 'participant', title: 'مشارك جديد في الحملة', message: 'سجل متبرع جديد في حملة قطرة حياة.', at: 'منذ 8 دقائق', read: false, link: '#/institution/campaigns/participants?id=CP-2026-0031' },
    { id: 'N-O-17', type: 'request', title: 'طلب الدم جاهز', message: 'تم تجهيز طلب الدم BR-2026-0148 وأصبح جاهزًا للتسليم.', at: 'منذ ساعة', read: false, link: '#/institution/blood-requests/details?id=BR-2026-0148' },
    { id: 'N-O-16', type: 'approval', title: 'تم اعتماد مؤسستكم', message: 'يمكنكم الآن استخدام الخدمات المعتمدة في منصة قطرة.', at: '15 سبتمبر', read: true, link: '#/institution/dashboard' }
  ],
  supervisor: [
    { id: 'N-S-09', type: 'approval', title: 'طلب اعتماد جديد', message: 'مؤسسة صحية جديدة تنتظر المراجعة.', at: 'منذ 20 دقيقة', read: false, link: '#/supervisor/approvals' }
  ]
};

function read(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}
function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
export function getCampaigns() { return read('qatraCampaigns', seedCampaigns); }
function saveCampaigns(value) { write('qatraCampaigns', value); }
export function getParticipants() { return read('qatraCampaignParticipants', seedParticipants); }
function saveParticipants(value) { write('qatraCampaignParticipants', value); }
export function getNotifications(role = 'donor') { return read('qatraNotifications_' + role, seedNotifications[role] || []); }
function saveNotifications(role, value) {
  write('qatraNotifications_' + role, value);
  window.dispatchEvent(new Event('qatra-notifications'));
}
export function addNotification(role, item) {
  const items = getNotifications(role);
  if (items.some(x => x.id === item.id)) return;
  saveNotifications(role, [{ ...item, read: false }, ...items]);
}

function Status({ status }) {
  return <span className={'campaign-status ' + status}><i />{statusLabels[status]}</span>;
}
function ParticipationStatus({ status }) {
  return <span className={'participation-status ' + status}><i />{participationLabels[status]}</span>;
}
function OrgGuard({ children }) {
  const org = getOrg();
  return org.status === 'approved' ? children : <Portal role="organization"><div className="portal-content"><div className="access-denied"><span><LockKeyhole /></span><h1>إدارة الحملات غير متاحة</h1><p>يجب اعتماد المؤسسة وامتلاك صلاحية تنظيم الحملات.</p><button className="btn btn-primary" onClick={() => go('#/institution/dashboard')}>العودة</button></div></div></Portal>;
}
function CampaignField({ label, error, required = true, children }) {
  return <label className={'field ' + (error ? 'field-error' : '')}><span>{label}{required && <b>*</b>}</span><div className="input-wrap">{children}</div>{error && <small className="error-text"><CircleX />{error}</small>}</label>;
}

export function InstitutionCampaigns() {
  const [campaigns, setCampaigns] = useState(getCampaigns());
  const [tab, setTab] = useState('all');
  const [cancelId, setCancelId] = useState(null);
  const mine = campaigns.filter(x => x.owner === 'ORG-24018' && (tab === 'all' || x.status === tab));
  const cancelCampaign = () => {
    const next = campaigns.map(x => x.id === cancelId ? { ...x, status: 'cancelled', updated: 'الآن' } : x);
    saveCampaigns(next); setCampaigns(next);
    const participants = getParticipants().filter(x => x.campaignId === cancelId && x.status !== 'cancelled');
    participants.forEach(x => addNotification('donor', { id: 'N-CANCEL-' + cancelId + '-' + x.donorId, type: 'campaign', title: 'تم إلغاء حملة مسجل فيها', message: 'ألغت المؤسسة حملة ' + campaigns.find(c => c.id === cancelId)?.title + '.', at: 'الآن', link: '#/campaigns/details?id=' + cancelId + '&role=donor' }));
    setCancelId(null);
  };
  return <OrgGuard><Portal role="organization" active="campaigns"><div className="portal-content">
    <div className="page-heading"><div><span>تنظيم فعاليات التبرع</span><h1>حملات التبرع</h1><p>أنشئ حملات منظّمة، تابع حالتها والمشاركين فيها دون خلط التسجيل بالتبرع الفعلي.</p></div><button className="btn btn-primary" onClick={() => go('#/institution/campaigns/new')}><Plus /> إنشاء حملة</button></div>
    <div className="campaign-kpis"><article><span><CalendarDays /></span><div><small>الحملات القادمة</small><strong>{campaigns.filter(x => x.owner === 'ORG-24018' && x.status === 'upcoming').length}</strong></div></article><article><span className="green"><UsersRound /></span><div><small>المشاركون المسجلون</small><strong>{getParticipants().filter(x => x.status === 'registered').length}</strong></div></article><article><span className="blue"><BadgeCheck /></span><div><small>تبرعات موثقة</small><strong>{getParticipants().filter(x => x.status === 'donated').length}</strong></div></article></div>
    <section className="campaigns-admin-panel"><div className="request-tabs"><button className={tab === 'all' ? 'active' : ''} onClick={() => setTab('all')}>الكل</button>{['upcoming', 'active', 'completed', 'cancelled'].map(x => <button key={x} className={tab === x ? 'active' : ''} onClick={() => setTab(x)}>{statusLabels[x]}</button>)}</div>
      <div className="admin-campaign-list">{mine.map(c => <article key={c.id}><div className="campaign-date-block"><strong>{c.date.slice(8)}</strong><span>سبتمبر</span><small>{c.start}</small></div><div className="admin-campaign-main"><small>{c.id}</small><h2>{c.title}</h2><p><MapPin /> {c.area} · {c.location}</p><div>{c.blood.slice(0, 4).map(x => <span className="blood-chip" key={x}>{x}</span>)}{c.blood.length > 4 && <em>+{c.blood.length - 4}</em>}</div></div><div className="admin-campaign-meta"><Status status={c.status} /><span>{getParticipants().filter(x => x.campaignId === c.id && x.status !== 'cancelled').length} مشاركين</span></div><div className="admin-campaign-actions"><button onClick={() => go('#/campaigns/details?id=' + c.id + '&role=organization')}><Info /> التفاصيل</button><button onClick={() => go('#/institution/campaigns/participants?id=' + c.id)}><UsersRound /> المشاركون</button>{c.status === 'upcoming' && <button onClick={() => go('#/institution/campaigns/edit?id=' + c.id)}><Edit3 /> تعديل</button>}{['upcoming', 'active'].includes(c.status) && <button className="danger-link" onClick={() => setCancelId(c.id)}><X /> إلغاء</button>}</div></article>)}</div>
    </section>
    {cancelId && <div className="modal-backdrop" onClick={() => setCancelId(null)}><div className="decision-modal" onClick={e => e.stopPropagation()}><button onClick={() => setCancelId(null)}><X /></button><span className="reject"><AlertTriangle /></span><h2>إلغاء الحملة؟</h2><p>ستبقى الحملة محفوظة في السجل ولن تقبل مشاركات جديدة، وسيظهر التحديث للمشاركين.</p><div><button className="btn btn-outline" onClick={() => setCancelId(null)}>تراجع</button><button className="btn reject-decision" onClick={cancelCampaign}>تأكيد الإلغاء</button></div></div></div>}
  </div></Portal></OrgGuard>;
}

export function CampaignForm() {
  const id = new URLSearchParams(window.location.hash.split('?')[1] || '').get('id');
  const existing = getCampaigns().find(x => x.id === id);
  const [form, setForm] = useState(existing || { title: '', description: '', date: '', start: '', end: '', governorate: '', area: '', location: '', blood: [], target: '', status: 'upcoming' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);
  const set = (key, value) => setForm({ ...form, [key]: value });
  const toggleBlood = value => set('blood', form.blood.includes(value) ? form.blood.filter(x => x !== value) : [...form.blood, value]);
  const submit = e => {
    e.preventDefault();
    const nextErrors = {};
    ['title', 'description', 'date', 'start', 'end', 'governorate', 'area', 'location'].forEach(k => { if (!String(form[k]).trim()) nextErrors[k] = 'هذا الحقل مطلوب'; });
    if (form.end && form.start && form.end <= form.start) nextErrors.end = 'يجب أن يكون وقت النهاية بعد البداية';
    if (!form.blood.length) nextErrors.blood = 'اختر فصيلة واحدة على الأقل';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const campaigns = getCampaigns();
    const saved = existing ? { ...existing, ...form, updated: 'الآن' } : { ...form, target: Number(form.target) || null, id: 'CP-2026-' + String(32 + campaigns.length).padStart(4, '0'), institution: 'مستشفى الأمل التخصصي', owner: 'ORG-24018', created: 'الآن', status: 'upcoming' };
    saveCampaigns(existing ? campaigns.map(x => x.id === id ? saved : x) : [saved, ...campaigns]);
    if (!existing) addNotification('organization', { id: 'N-CREATED-' + saved.id, type: 'campaign', title: 'تم نشر الحملة', message: 'أصبحت حملة ' + saved.title + ' متاحة للمستخدمين.', at: 'الآن', link: '#/campaigns/details?id=' + saved.id + '&role=organization' });
    setDone(saved);
  };
  if (existing && existing.status !== 'upcoming') return <OrgGuard><Portal role="organization"><div className="portal-content"><div className="access-denied"><span><LockKeyhole /></span><h1>لا يمكن تعديل هذه الحملة</h1><p>التعديل متاح للحملات القادمة فقط حفاظًا على السجل التاريخي.</p><button className="btn btn-primary" onClick={() => go('#/institution/campaigns')}>العودة</button></div></div></Portal></OrgGuard>;
  if (done) return <OrgGuard><Portal role="organization"><div className="portal-content narrow-content"><div className="request-created"><span><CheckCircle2 /></span><small>{existing ? 'تم تحديث الحملة' : 'تم نشر الحملة'}</small><h1>{done.id}</h1><p>حُفظت الحملة وربطت بالمؤسسة، وأصبحت حالتها «قادمة».</p><button className="btn btn-primary" onClick={() => go('#/institution/campaigns')}>عرض حملاتي</button></div></div></Portal></OrgGuard>;
  return <OrgGuard><Portal role="organization" active="campaigns"><div className="portal-content narrow-content"><div className="request-page-head"><button className="back-square" onClick={() => go('#/institution/campaigns')}><ArrowRight /></button><div><small>إدارة الحملات</small><h1>{existing ? 'تعديل حملة تبرع' : 'إنشاء حملة تبرع'}</h1><p>أدخل معلومات عامة وآمنة تساعد المتبرعين على اتخاذ قرار المشاركة.</p></div></div>
    <form className="blood-request-form campaign-form" onSubmit={submit}><section><div className="form-block-title"><span><Megaphone /></span><div><h3>معلومات الحملة</h3><p>الحقول المعلّمة مطلوبة للنشر.</p></div></div><div className="form-grid"><CampaignField label="اسم الحملة" error={errors.title}><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="مثال: حملة قطرة حياة" /></CampaignField><CampaignField label="التاريخ" error={errors.date}><input type="date" value={form.date} onChange={e => set('date', e.target.value)} /></CampaignField><CampaignField label="وقت البداية" error={errors.start}><input type="time" value={form.start} onChange={e => set('start', e.target.value)} /></CampaignField><CampaignField label="وقت النهاية" error={errors.end}><input type="time" value={form.end} onChange={e => set('end', e.target.value)} /></CampaignField><CampaignField label="المحافظة" error={errors.governorate}><select value={form.governorate} onChange={e => set('governorate', e.target.value)}><option value="">اختر المحافظة</option>{governorates.map(x => <option key={x}>{x}</option>)}</select></CampaignField><CampaignField label="المنطقة / المدينة" error={errors.area}><input value={form.area} onChange={e => set('area', e.target.value)} placeholder="رام الله" /></CampaignField><CampaignField label="مكان الحملة والعنوان" error={errors.location}><input value={form.location} onChange={e => set('location', e.target.value)} placeholder="اسم المركز والعنوان التفصيلي" /></CampaignField><CampaignField label="العدد المستهدف" required={false}><input type="number" min="1" value={form.target || ''} onChange={e => set('target', e.target.value)} placeholder="اختياري" /></CampaignField></div><CampaignField label="وصف الحملة" error={errors.description}><textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="صف هدف الحملة والتعليمات العامة دون معلومات طبية شخصية" /></CampaignField><CampaignField label="الفصائل المستهدفة" error={errors.blood}><div className="campaign-blood-picker">{bloodTypes.map(x => <button type="button" className={form.blood.includes(x) ? 'selected' : ''} onClick={() => toggleBlood(x)} key={x}>{form.blood.includes(x) && <Check />}{x}</button>)}</div></CampaignField></section><div className="form-info"><ShieldCheck /><p>ملكية الحملة تحدد من الحساب الحالي، والحملات الملغاة أو المكتملة لا تقبل تسجيلات جديدة.</p></div><div className="request-form-actions"><button type="button" className="btn btn-outline" onClick={() => go('#/institution/campaigns')}>إلغاء</button><button className="btn btn-primary">{existing ? 'حفظ التعديلات' : 'نشر الحملة'} <ArrowLeft /></button></div></form>
  </div></Portal></OrgGuard>;
}

function PublicCampaignHeader({ role }) {
  return <header className="campaign-public-header"><button className="campaign-logo" onClick={() => go('#/')}><span><Droplets /></span><strong>قطرة<small>QATRA</small></strong></button><nav><button onClick={() => go('#/')}>الرئيسية</button><button className="active" onClick={() => go('#/campaigns' + (role === 'donor' ? '?role=donor' : ''))}>حملات التبرع</button></nav><div>{role === 'donor' ? <button className="btn btn-outline" onClick={() => go('#/donor/dashboard')}>لوحة المتبرع</button> : <><button className="btn btn-ghost" onClick={() => go('#/login')}>تسجيل الدخول</button><button className="btn btn-primary" onClick={() => go('#/register/donor')}>انضم كمتبرع</button></>}</div></header>;
}

export function PublicCampaigns() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || ''), role = params.get('role') || 'visitor';
  const [query, setQuery] = useState(''), [gov, setGov] = useState('all'), [blood, setBlood] = useState('all');
  const items = useMemo(() => getCampaigns().filter(x => ['upcoming', 'active'].includes(x.status) && (gov === 'all' || x.governorate === gov) && (blood === 'all' || x.blood.includes(blood)) && (!query || x.title.includes(query) || x.institution.includes(query) || x.area.includes(query))).sort((a, b) => a.date.localeCompare(b.date)), [query, gov, blood]);
  return <div className="campaign-public"><PublicCampaignHeader role={role} /><main><section className="campaign-public-hero"><span>حملات تبرع منظّمة وآمنة</span><h1>اختر حملة قريبة منك<br />وساهم في صنع الأمل</h1><p>استكشف الحملات القادمة والجارية، واعرف المكان والموعد والفصائل المطلوبة قبل التسجيل.</p></section><section className="public-campaign-content"><div className="public-campaign-toolbar"><label><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث باسم الحملة أو المؤسسة أو المدينة" /></label><select value={gov} onChange={e => setGov(e.target.value)}><option value="all">كل المحافظات</option>{governorates.map(x => <option key={x}>{x}</option>)}</select><select value={blood} onChange={e => setBlood(e.target.value)}><option value="all">كل الفصائل</option>{bloodTypes.map(x => <option key={x}>{x}</option>)}</select></div><div className="public-results-head"><div><h2>الحملات المتاحة</h2><p>مرتبة حسب أقرب موعد</p></div><span>{items.length} حملات</span></div><div className="public-campaign-grid">{items.map(c => <article key={c.id}><div className="public-card-cover"><span className="date-pill"><strong>{c.date.slice(8)}</strong><small>سبتمبر</small></span><Status status={c.status} /></div><div className="public-card-body"><small>{c.institution}</small><h3>{c.title}</h3><p>{c.description}</p><div className="public-card-info"><span><CalendarDays /> {c.date} · {c.start}–{c.end}</span><span><MapPin /> {c.governorate}، {c.area}</span></div><div className="public-card-blood">{c.blood.length === bloodTypes.length ? <span>جميع الفصائل</span> : c.blood.map(x => <span key={x}>{x}</span>)}</div><button onClick={() => go('#/campaigns/details?id=' + c.id + '&role=' + role)}>عرض تفاصيل الحملة <ArrowLeft /></button></div></article>)}</div>{!items.length && <div className="request-empty large"><Search /><h2>لا توجد حملات مطابقة</h2><p>جرّب تغيير معايير البحث أو الفلاتر.</p></div>}</section></main></div>;
}

export function CampaignDetails() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || ''), id = params.get('id'), role = params.get('role') || 'visitor';
  const [participants, setParticipants] = useState(getParticipants());
  const [confirm, setConfirm] = useState(null);
  const campaign = getCampaigns().find(x => x.id === id);
  const mine = participants.find(x => x.campaignId === id && x.donorId === 'D-1001');
  if (!campaign || campaign.status === 'draft') return <div className="campaign-public"><PublicCampaignHeader role={role} /><div className="public-not-found"><Search /><h1>الحملة غير موجودة</h1><button className="btn btn-primary" onClick={() => go('#/campaigns')}>عرض الحملات</button></div></div>;
  const join = () => {
    if (mine || !['upcoming', 'active'].includes(campaign.status)) return;
    const item = { campaignId: id, donorId: 'D-1001', name: 'أحمد خالد', blood: 'O+', area: 'رام الله', status: 'registered', registeredAt: 'الآن' };
    const next = [item, ...participants]; saveParticipants(next); setParticipants(next); setConfirm(null);
    addNotification('organization', { id: 'N-JOIN-' + id + '-D-1001', type: 'participant', title: 'مشارك جديد في الحملة', message: 'سجل أحمد خالد للمشاركة في حملة ' + campaign.title + '.', at: 'الآن', link: '#/institution/campaigns/participants?id=' + id });
  };
  const cancel = () => {
    const next = participants.map(x => x.campaignId === id && x.donorId === 'D-1001' ? { ...x, status: 'cancelled', cancelledAt: 'الآن' } : x);
    saveParticipants(next); setParticipants(next); setConfirm(null);
  };
  const open = ['upcoming', 'active'].includes(campaign.status);
  return <div className="campaign-public"><PublicCampaignHeader role={role} /><main className="campaign-details-page"><button className="back-text" onClick={() => go('#/campaigns' + (role === 'donor' ? '?role=donor' : ''))}><ArrowRight /> العودة للحملات</button><section className="campaign-detail-hero"><div><Status status={campaign.status} /><small>{campaign.id}</small><h1>{campaign.title}</h1><p>{campaign.description}</p><span><Building2 /> تنظمها {campaign.institution}</span></div><div className="campaign-big-date"><CalendarDays /><strong>{campaign.date}</strong><span>{campaign.start} — {campaign.end}</span></div></section><div className="campaign-detail-layout"><div><section className="campaign-detail-card"><h2>تفاصيل الحملة</h2><div className="campaign-detail-facts"><div><CalendarDays /><span><small>التاريخ والوقت</small><strong>{campaign.date}</strong><em>{campaign.start} — {campaign.end}</em></span></div><div><MapPin /><span><small>الموقع</small><strong>{campaign.governorate}، {campaign.area}</strong><em>{campaign.location}</em></span></div><div><UsersRound /><span><small>العدد المستهدف</small><strong>{campaign.target || 'مفتوح'}</strong><em>مشاركًا</em></span></div></div></section><section className="campaign-detail-card"><h2>الفصائل المستهدفة</h2><p>يمكن لأصحاب الفصائل التالية تسجيل رغبتهم بالمشاركة:</p><div className="campaign-target-blood">{campaign.blood.map(x => <span key={x}><Droplets />{x}</span>)}</div></section><section className="privacy-callout"><ShieldCheck /><div><strong>خصوصيتك مهمة</strong><p>لا تعرض الصفحة بيانات أي مشارك، والتسجيل يعبر عن نية الحضور فقط ولا يعني حدوث تبرع فعلي أو إثبات الأهلية الطبية.</p></div></section></div><aside className="join-campaign-card"><h3>المشاركة في الحملة</h3>{role !== 'donor' ? <><p>سجّل الدخول بحساب متبرع للانضمام إلى الحملة ومتابعة حالة مشاركتك.</p><button className="btn btn-primary full" onClick={() => go('#/login')}>تسجيل الدخول للمشاركة</button><button className="btn btn-outline full" onClick={() => go('#/register/donor')}>إنشاء حساب متبرع</button></> : mine?.status === 'donated' ? <div className="registered-box"><BadgeCheck /><strong>تبرع موثق</strong><p>تم ربط المشاركة بسجل تبرع فعلي.</p></div> : mine?.status === 'attended' ? <div className="registered-box"><UserCheck /><strong>تم تسجيل حضورك</strong><p>الحضور لا يعني أن تبرعًا فعليًا قد سُجّل.</p></div> : mine?.status === 'registered' ? <div className="registered-box"><CheckCircle2 /><strong>أنت مسجل للمشاركة</strong><p>سجلت {mine.registeredAt}. هذا التسجيل لا يعني تبرعًا مكتملًا.</p>{open && <button className="btn btn-outline full" onClick={() => setConfirm('cancel')}>إلغاء مشاركتي</button>}</div> : mine?.status === 'cancelled' ? <div className="closed-registration"><CircleX /><strong>ألغيت مشاركتك</strong><p>تم الاحتفاظ بسجل المشاركة دون احتسابه كتبرع.</p></div> : !open ? <div className="closed-registration"><LockKeyhole /><strong>التسجيل مغلق</strong><p>الحملات الملغاة أو المكتملة لا تقبل مشاركات جديدة.</p></div> : <><p>أكد نيتك للحضور. ستستطيع المؤسسة رؤية الحد الأدنى من بياناتك لتنظيم الحملة.</p><button className="btn btn-primary full" onClick={() => setConfirm('join')}><UserCheck /> أرغب بالمشاركة</button></>}</aside></div></main>{confirm && <div className="modal-backdrop" onClick={() => setConfirm(null)}><div className="decision-modal" onClick={e => e.stopPropagation()}><button onClick={() => setConfirm(null)}><X /></button><span className={confirm === 'join' ? 'accept' : 'reject'}>{confirm === 'join' ? <UserCheck /> : <AlertTriangle />}</span><h2>{confirm === 'join' ? 'تأكيد المشاركة' : 'إلغاء المشاركة؟'}</h2><p>{confirm === 'join' ? 'سيتم تسجيل رغبتك في الحضور ولن تعتبر العملية تبرعًا فعليًا.' : 'سيظهر للمؤسسة أنك ألغيت مشاركتك، وسيبقى السجل محفوظًا.'}</p><div><button className="btn btn-outline" onClick={() => setConfirm(null)}>تراجع</button><button className={'btn ' + (confirm === 'join' ? 'accept-decision' : 'reject-decision')} onClick={confirm === 'join' ? join : cancel}>تأكيد</button></div></div></div>}</div>;
}

export function CampaignParticipants() {
  const id = new URLSearchParams(window.location.hash.split('?')[1] || '').get('id') || 'CP-2026-0031';
  const campaign = getCampaigns().find(x => x.id === id);
  const [items, setItems] = useState(getParticipants());
  const [status, setStatus] = useState('all'), [query, setQuery] = useState('');
  if (!campaign || campaign.owner !== 'ORG-24018') return <OrgGuard><Portal role="organization"><div className="portal-content"><div className="access-denied"><LockKeyhole /><h1>غير مصرح بعرض المشاركين</h1><p>قائمة المشاركين متاحة للمؤسسة المنظمة فقط.</p></div></div></Portal></OrgGuard>;
  const all = items.filter(x => x.campaignId === id), list = all.filter(x => (status === 'all' || x.status === status) && (!query || x.name.includes(query) || x.donorId.toLowerCase().includes(query.toLowerCase())));
  const attend = donorId => { const next = items.map(x => x.campaignId === id && x.donorId === donorId && x.status === 'registered' ? { ...x, status: 'attended', attendedAt: 'الآن' } : x); saveParticipants(next); setItems(next); };
  return <OrgGuard><Portal role="organization" active="campaigns"><div className="portal-content"><div className="request-page-head"><button className="back-square" onClick={() => go('#/institution/campaigns')}><ArrowRight /></button><div><small>{campaign.id}</small><h1>مشاركو {campaign.title}</h1><p>تعرض أقل قدر ضروري من بيانات المتبرعين لأغراض تنظيم الحملة فقط.</p></div></div><div className="participant-kpis"><article><strong>{all.filter(x => x.status === 'registered').length}</strong><small>مسجلون</small></article><article><strong>{all.filter(x => x.status === 'cancelled').length}</strong><small>ألغوا المشاركة</small></article><article><strong>{all.filter(x => x.status === 'attended').length}</strong><small>حضروا</small></article><article><strong>{all.filter(x => x.status === 'donated').length}</strong><small>تبرعات موثقة</small></article></div><section className="participants-panel"><div className="participants-toolbar"><label><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث بالاسم أو المعرّف" /></label><select value={status} onChange={e => setStatus(e.target.value)}><option value="all">كل الحالات</option>{Object.entries(participationLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div><div className="participants-list">{list.map(x => <article key={x.donorId}><span className="donor-avatar">{x.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span><div><strong>{x.name}</strong><small>{x.donorId} · {x.area}</small></div><span className="blood-chip">{x.blood}</span><div><small>تاريخ التسجيل</small><strong>{x.registeredAt}</strong></div><ParticipationStatus status={x.status} />{x.status === 'registered' && campaign.status === 'active' ? <button className="btn btn-outline" onClick={() => attend(x.donorId)}><UserCheck /> تسجيل حضور</button> : x.status === 'donated' ? <span className="donation-link"><BadgeCheck /> {x.donationId}</span> : <span />}</article>)}</div>{!list.length && <div className="request-empty"><UsersRound /><h3>لا يوجد مشاركون مطابقون</h3></div>}</section><div className="form-info"><Info /><p>الحضور لا يعني التبرع. تتحول الحالة إلى «تبرع فعليًا» فقط بعد ربطها بسجل Donation من جهة مخولة.</p></div></div></Portal></OrgGuard>;
}

export function NotificationCenter() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || ''), role = params.get('role') || 'donor';
  const [items, setItems] = useState(getNotifications(role)), [tab, setTab] = useState('all');
  const visible = items.filter(x => tab === 'all' || !x.read);
  const mark = id => { const next = items.map(x => x.id === id ? { ...x, read: true, readAt: 'الآن' } : x); saveNotifications(role, next); setItems(next); };
  const markAll = () => { const next = items.map(x => x.read ? x : { ...x, read: true, readAt: 'الآن' }); saveNotifications(role, next); setItems(next); };
  const open = item => { mark(item.id); if (item.link) go(item.link); };
  return <Portal role={role} active="notifications"><div className="portal-content narrow-content"><div className="page-heading"><div><span>آخر التحديثات</span><h1>مركز الإشعارات</h1><p>الإشعارات الخاصة بحسابك فقط، مرتبة من الأحدث إلى الأقدم.</p></div><button className="btn btn-outline" disabled={!items.some(x => !x.read)} onClick={markAll}><Check /> تحديد الكل كمقروء</button></div><section className="notifications-panel"><div className="notification-tabs"><button className={tab === 'all' ? 'active' : ''} onClick={() => setTab('all')}>الكل <span>{items.length}</span></button><button className={tab === 'unread' ? 'active' : ''} onClick={() => setTab('unread')}>غير المقروءة <span>{items.filter(x => !x.read).length}</span></button></div><div className="notification-list">{visible.map(n => <article className={n.read ? 'read' : 'unread'} key={n.id}><button className="notification-main" onClick={() => open(n)}><span className={'notification-icon ' + n.type}>{n.type === 'campaign' ? <CalendarDays /> : n.type === 'participant' ? <UsersRound /> : n.type === 'approval' ? <BadgeCheck /> : <Bell />}</span><div><span><strong>{n.title}</strong>{!n.read && <i />}</span><p>{n.message}</p><small>{n.at}</small></div><ChevronLeft /></button>{!n.read && <button className="mark-read" onClick={() => mark(n.id)}><Check /> تحديد كمقروء</button>}</article>)}</div>{!visible.length && <div className="request-empty large"><Bell /><h2>{tab === 'unread' ? 'اطلعت على كل شيء' : 'لا توجد إشعارات'}</h2><p>{tab === 'unread' ? 'لا توجد إشعارات جديدة تحتاج انتباهك.' : 'ستظهر هنا التحديثات المرتبطة بحسابك.'}</p></div>}</section></div></Portal>;
}
