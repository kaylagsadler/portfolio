import Link from 'next/link'

type NavLinkProps = {
  href: string
  label: string
}

export default function NavLink({ href, label }: NavLinkProps) {
  return (
    <Link className="nav-link" data-text={label} href={href}>
      <span className="nav-link__label">{label}</span>
    </Link>
  )
}
