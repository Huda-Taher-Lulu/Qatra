# Qatra — Color Design System

> Extracted from the Figma file **قطرة — Qatra Color System**.
> The values and token names below are based on the variables and documented color sections in the design.

## 01 — Brand Colors

| Arabic Name | English Name | Hex | Token | Usage |
|---|---|---|---|---|
| أحمر قطرة | Deep Crimson | `#9E1B32` | `Primitives/Brand/Primary/500` | الأزرار الأساسية، التبرع، العناصر المهمة |
| عنابي داكن | Burgundy | `#5B0F1B` | `Primitives/Brand/Burgundy/500` | حالة التحويم، التذييل، التأكيد القوي |
| كحلي عميق | Deep Navy | `#172A3A` | `Primitives/Brand/Navy/500` | العناوين، النصوص الرئيسية، التنقل |
| وردي ترابي | Dusty Rose | `#D98C97` | `Primitives/Brand/DustyRose/500` | الخلفيات الهادئة، الأقسام الإنسانية |
| عاجي لؤلؤي | Pearl Ivory | `#F7F3EF` | `Primitives/Neutral/Ivory` | خلفية الصفحة الرئيسية، الأسطح الناعمة |
| تركوازي طبي | Medical Teal | `#4F8C8D` | `Primitives/Brand/Teal/500` | حالات النجاح، الصحة، التبرع الناجح |
| ذهبي شامبانيا | Soft Champagne | `#C6A56B` | `Primitives/Brand/Champagne/500` | لمسات فاخرة، تفاصيل زخرفية صغيرة فقط |
| أبيض | White | `#FFFFFF` | `Primitives/Neutral/White` | البطاقات، الحقول، النص على الأزرار |

## 02 — Core Variable Definitions

```text
Primitives/Brand/Primary/500       #9E1B32
Primitives/Brand/Burgundy/500     #5B0F1B
Primitives/Brand/Navy/500         #172A3A
Primitives/Brand/DustyRose/500    #D98C97
Primitives/Brand/Teal/500         #4F8C8D
Primitives/Brand/Champagne/500    #C6A56B
Primitives/Neutral/Ivory          #F7F3EF
Primitives/Neutral/White          #FFFFFF

Semantic/Brand/Dark               #172A3A
Semantic/Text/Primary             #172A3A
Semantic/Text/Secondary           #53606B
Semantic/Text/Muted               #8A929E
```

## 03 — Text Colors

| Name | English | Hex | Token | Usage |
|---|---|---|---|---|
| نص أساسي | Text Primary | `#172A3A` | `Semantic/Text/Primary` | العناوين والنصوص الرئيسية |
| نص ثانوي | Text Secondary | `#53606B` | `Semantic/Text/Secondary` | النصوص العادية والوصفية |
| نص خافت | Text Muted | `#8A929E` | `Semantic/Text/Muted` | التفاصيل الثانوية والتلميحات |
| نص معطّل | Text Disabled | `#B7BEC6` | `Semantic/Text/Disabled` | العناصر غير الفعالة |
| نص معكوس | Text Inverse | `#FFFFFF` | `Semantic/Text/Inverse` | النص على الخلفيات الداكنة والأزرار |

## 04 — Background Colors

| Name | English | Hex | Token | Usage |
|---|---|---|---|---|
| خلفية أساسية | Background Primary | `#F7F3EF` | `Semantic/Background/Primary` | خلفية الصفحة الرئيسية |
| خلفية ثانوية | Background Secondary | `#FFFFFF` | `Semantic/Background/Secondary` | الأقسام والبطاقات الثانوية |
| سطح | Background Surface | `#FFFFFF` | `Semantic/Background/Surface` | البطاقات، الحقول، الأسطح النظيفة |
| خلفية داكنة | Background Dark | `#172A3A` | `Semantic/Background/Dark` | الأقسام الداكنة، التذييل |
| خلفية العلامة | Background Brand | `#9E1B32` | `Semantic/Background/Brand` | الأقسام ذات الطابع الاحتفالي بالعلامة |

## 05 — Border Colors

| Name | English | Hex | Token | Usage |
|---|---|---|---|---|
| حد افتراضي | Border Default | `#E4DED8` | `Semantic/Border/Default` | حدود البطاقات والحقول العادية |
| حد قوي | Border Strong | `#C7BEB4` | `Semantic/Border/Strong` | الفواصل البارزة والتأكيد |
| حد التركيز | Border Focus | `#BB5F70` | `Semantic/Border/Focus` | حلقة التركيز عند التنقل بلوحة المفاتيح |
| حد معطّل | Border Disabled | `#D8D2CB` | `Semantic/Border/Disabled` | حدود العناصر غير الفعالة |

## 06 — Status Colors

| Name | English | Hex | Token | Usage |
|---|---|---|---|---|
| نجاح | Success | `#4F8C8D` | `Semantic/Status/Success` | التبرع الناجح، الحالة الصحية الإيجابية |
| خلفية النجاح | Success Background | `#F4F8F8` | `Semantic/Status/SuccessBackground` | خلفية رسائل النجاح |
| خطأ | Error | `#9E1B32` | `Semantic/Status/Error` | الأخطاء والتنبيهات الحرجة |
| خلفية الخطأ | Error Background | `#F9F1F3` | `Semantic/Status/ErrorBackground` | خلفية رسائل الخطأ |
| تحذير | Warning | `#9C6B24` | `Semantic/Status/Warning` | التنبيهات وتأكيد البيانات |
| خلفية التحذير | Warning Background | `#F5E6CC` | `Semantic/Status/WarningBackground` | خلفية رسائل التحذير |
| معلومة | Info | `#2F6B8A` | `Semantic/Status/Info` | الإرشادات والمعلومات العامة |
| خلفية المعلومة | Info Background | `#E1EDF1` | `Semantic/Status/InfoBackground` | خلفية رسائل المعلومات |

## 07 — Interactive States

The design documents these CTA states:

- Default — افتراضي
- Hover — تحويم
- Pressed — ضغط
- Disabled — معطّل
- Focus — تركيز

### Focus

The documented focus treatment uses a focus border based on the brand color system:

`Semantic/Border/Focus → #BB5F70`

## 08 — Color Scales

The Figma file documents tonal scales for:

- Primary — base `#9E1B32`
- Burgundy — base `#5B0F1B`
- Navy — base `#172A3A`
- Teal — base `#4F8C8D`
- Dusty Rose — base `#D98C97`

Each scale is organized with the following levels:

`50 / 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900`

> Note: the Figma page visually documents the 50–900 scale structure, while the variable extraction available here exposes the defined core tokens above. The individual scale hex values for every 50–900 step are therefore not inferred or fabricated in this document.

## 09 — Design Usage Examples

### Primary CTA
- Main action: `#9E1B32`
- Hover / stronger emphasis: `#5B0F1B`
- Focus: `#BB5F70`
- Disabled state: use the disabled semantic treatment

### Text hierarchy
- Primary: `#172A3A`
- Secondary: `#53606B`
- Muted: `#8A929E`
- Inverse: `#FFFFFF`

### Surfaces
- Primary background: `#F7F3EF`
- Secondary / surface: `#FFFFFF`
- Dark background: `#172A3A`
- Brand background: `#9E1B32`

### Status feedback
- Success: `#4F8C8D`
- Error: `#9E1B32`
- Warning: `#9C6B24`
- Info: `#2F6B8A`

## 10 — Token Naming Convention

The system follows two main layers:

### Primitives
Raw foundational values:

`Primitives/Brand/...`
`Primitives/Neutral/...`

### Semantic
Contextual usage values:

`Semantic/Text/...`
`Semantic/Background/...`
`Semantic/Border/...`
`Semantic/Status/...`

Use semantic tokens in UI implementation whenever possible instead of hard-coding primitive values.

---

### Source

Figma file:
**قطرة — Qatra Color System**

File key:
`NpwSjEoN69GhbM00jfMLHY`
