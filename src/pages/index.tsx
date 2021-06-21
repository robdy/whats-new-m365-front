import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';

type Entry = {
  Category: string;
  Cmdlet: string;
  Param?: string;
  Event: string;
  Timestamp: Date;
};

export async function getStaticProps(context: unknown) {
  const res = await fetch(
    `https://robdy.github.io/whats-new-m365/changelog.json`,
  );
  const arr : Entry[] = await res.json()
  const data = arr.filter(Boolean) // falsy bouncer;
  return {
    props: { data },
  };
}

export default function Home({ data }) {
   const tab = data.map((entry: Entry) => (
     <div>
       <h2>{entry.Cmdlet}</h2>
       <p>{entry.Category}</p>
       <p>{entry.Event}</p>
       {entry.Param && <p>{entry.Param}</p>}
       <p>{entry.Timestamp}</p>
     </div>
   ));
   return tab;
 }
