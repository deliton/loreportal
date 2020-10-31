import Head from "next/head";
import styles from "../styles/Home.module.css";
import dbConnect from "../utils/dbConnect";
import Entry from "../models/entry";
import { useState } from "react";
import HorizontalTimeline from "react-horizontal-timeline";

export default function Home({ entries }) {
  const [value, setvalue] = useState(0);
  const [previous, setPrevious] = useState(0);

  const dates = entries.map((entry) => {
    return Date.now();
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://wow.loreportal.com">Lore Portal!</a>
        </h1>

        {/* {entries.map((entry) => {
          return (
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.text}</p>
              <a href={entry.video}>Watch Video</a>
            </div>
          );
        })} */}

        <div>
          {/* Bounding box for the Timeline */}
          <div>
            <h3>{entries[value].title}</h3>
            <p>{entries[value].text}</p>
            <a href={entries[value].video}>Watch Video</a>
          </div>
          <div style={{ width: "100%", height: "150px", margin: "0 auto" }}>
            <HorizontalTimeline
              index={value}
              indexClick={(index) => {
                setvalue(index);
                setPrevious(value);
              }}
              values={dates}
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Entry.find({});
  const entries = result.map((doc) => {
    const entry = doc.toObject();
    entry._id = entry._id.toString();
    return entry;
  });

  return { props: { entries: entries } };
}
