import Link from "next/link";

export function FooterLink({ text, linkText, href }: FooterLinkProps) {
  return (
    <div className="text-center pt-4">
      <p className="text-gray-500 text-sm">
        {text} {` `}
        <Link href={href} className="footer-link">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
