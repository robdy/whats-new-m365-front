type Entry = {
  Category: string;
  Cmdlet: string;
  Param?: string;
  Event: string;
  Timestamp: Date;
};

type HomeData = {
  data: Entry[];
};

export async function getStaticProps() {
  const res = await fetch(
    `https://robdy.github.io/whats-new-m365/changelog.json`,
  );
  const arr: Entry[] = await res.json();
  const data = arr.filter(Boolean); // falsy bouncer;
  return {
    props: { data },
  };
}

export default function Home({ data }: HomeData) {
  const tab = data.map((entry: Entry) => (
    <div
      key={`${entry.Cmdlet}-${entry.Category}-${entry.Event}-${
        entry.Param && <p>{entry.Param}</p>
      }`}
    >
      <h2>{entry.Cmdlet}</h2>
      <p>{entry.Category}</p>
      <p>{entry.Event}</p>
      {entry.Param && <p>{entry.Param}</p>}
      <p>{entry.Timestamp}</p>
    </div>
  ));
  return tab;
}
