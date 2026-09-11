import { Link } from "react-router-dom";

export default function IntroCallButton({
  to = "/project",
  title = "Visit my latest project",
  subtitle = "Cantu Construction — live site",
  external,
}) {
  const inner = (
    <span className="cta-copy">
      <strong>{title}</strong>
      <small>{subtitle}</small>
    </span>
  );

  if (external) {
    return (
      <a className="cta-dark" href={to} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link className="cta-dark" to={to}>
      {inner}
    </Link>
  );
}
