import "./sectionTitle.styles.css";

export default function SectionTitle({ title }) {
  const [line1, line2] = title.split("@");

  return (
    <div className="container-title">
      <h1 className="title-line1">
        {line1}
        <span className="title-line2">{line2}</span>
      </h1>
    </div>
  );
}
