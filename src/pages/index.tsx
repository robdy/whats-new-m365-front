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
      key={`box-${entry.Cmdlet}-${entry.Category}-${entry.Event}-${
        entry.Param && <p>{entry.Param}</p>
      }`}
      className={`p-4 bg-${entry.Event === 'Add' ? "green" : "red"}-100`}
    >
      <div
        key={`${entry.Cmdlet}-${entry.Category}-${entry.Event}-${
          entry.Param && <p>{entry.Param}</p>
        }`}
        className=""
      >
        <h2 className="">{entry.Cmdlet}</h2>
        <p>{entry.Category}</p>
        <p>{entry.Event}</p>
        {entry.Param && <p>{entry.Param}</p>}
        <p>{entry.Timestamp}</p>
      </div>
    </div>
  ));
  return (
    <div className="grid grid-cols-1 p-8 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {tab}
    </div>
  );
}
