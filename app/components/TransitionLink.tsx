'use client'
import { usePageTransition } from './PageTransition'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function TransitionLink({ href, children, onClick, ...props }: Props) {
  const { navigate } = usePageTransition()

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick?.(e)
        navigate(href)
      }}
      {...props}
    >
      {children}
    </a>
  )
}
