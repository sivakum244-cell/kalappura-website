// ============================================================================
// GOOGLE TAG MANAGER
// Replace GTM_ID with your actual GTM Container ID
// Get it from: https://tagmanager.google.com
// Format: GTM-XXXXXXX
// ============================================================================

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

export default function GoogleTagManager() {
  if (GTM_ID === "GTM-XXXXXXX") return null; // Skip if not configured

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </>
  );
}

// GTM Body noscript (add this in layout body if needed)
export function GoogleTagManagerNoScript() {
  if (GTM_ID === "GTM-XXXXXXX") return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
