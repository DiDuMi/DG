/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly PUBLIC_CONTACT_PHONE?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CONTACT_WHATSAPP?: string;
  readonly PUBLIC_CONTACT_WECHAT?: string;
  readonly PUBLIC_COMPANY_ADDRESS?: string;
  readonly PUBLIC_FORM_ACTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
