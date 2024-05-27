// declarations.d.ts
declare module 'js-cookie' {
    interface CookieAttributes {
      expires?: number | Date | undefined;
      path?: string | undefined;
      domain?: string | undefined;
      secure?: boolean | undefined;
      sameSite?: 'strict' | 'lax' | 'none' | undefined;
      [property: string]: any;
    }
  
    interface CookiesStatic {
      get(name: string): string | undefined;
      get(): { [key: string]: string };
      set(name: string, value: string, options?: CookieAttributes): void;
      set(name: string, value: any, options?: CookieAttributes): void;
      remove(name: string, options?: CookieAttributes): void;
      withAttributes(attributes: CookieAttributes): this;
      withConverter(converter: { read: (value: string, name: string) => string; write: (value: string, name: string) => string }): this;
    }
  
    const Cookies: CookiesStatic;
    export default Cookies;
  }
  