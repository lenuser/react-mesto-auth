import "./Spiner.css";

export default function Spiner({check}) {
  return <div className={`spiner ${check && 'spiner_type_check'}`}></div>;
}
