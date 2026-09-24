import { useState } from "react";
import { functionalIcons } from "../icons/icon-system";
import { Button, Chip, IconButton, SearchField, Surface } from "../primitives";
import "../tokens/tokens.css";
import "../typography/typography.css";
import "../primitives/primitives.css";
import "./primitives-preview.css";

export function PrimitivesPreview() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div data-v3-ui className="v3-primitives-preview" dir="rtl">
      <main className="v3-primitives-preview__content">
        <header>
          <p className="v3-type-meta">Stage 3H · isolated preview</p>
          <h1 className="v3-type-h1">مكوّنات دليل الثالث الأساسية</h1>
          <p className="v3-type-body">
            معاينة منفصلة لا تغيّر أي شاشة حالية في التطبيق.
          </p>
        </header>

        <Surface padding="lg" variant="raised">
          <h2 className="v3-type-h2">الأزرار</h2>
          <div className="v3-primitives-preview__row">
            <Button icon={functionalIcons.content.curriculum.icon}>استكشف المنهج</Button>
            <Button variant="secondary">زر ثانوي</Button>
            <Button variant="ghost">إجراء هادئ</Button>
            <Button disabled>غير متاح</Button>
          </div>
        </Surface>

        <Surface padding="lg">
          <h2 className="v3-type-h2">البحث والأيقونات</h2>
          <div className="v3-primitives-preview__stack">
            <SearchField
              label="ابحث في المنهج"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="مثال: الدوال"
              value={query}
            />
            <div className="v3-primitives-preview__row">
              <IconButton
                icon={functionalIcons.navigation.menu.icon}
                label="فتح القائمة"
                variant="soft"
              />
              <IconButton
                active
                icon={functionalIcons.navigation.home.icon}
                label="الرئيسية"
              />
              <IconButton
                icon={functionalIcons.action.copy.icon}
                label="نسخ"
                variant="plain"
              />
            </div>
          </div>
        </Surface>

        <Surface padding="lg" variant="subtle">
          <h2 className="v3-type-h2">المرشحات</h2>
          <div className="v3-primitives-preview__row">
            {[
              ["all", "الكل"],
              ["math", "رياضيات"],
              ["science", "علوم"],
            ].map(([value, label]) => (
              <Chip
                key={value}
                onClick={() => setFilter(value)}
                selected={filter === value}
                tone="primary"
              >
                {label}
              </Chip>
            ))}
          </div>
        </Surface>
      </main>
    </div>
  );
}
