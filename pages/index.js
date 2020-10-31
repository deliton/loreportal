import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dbConnect from '../utils/dbConnect'
import Entry from '../models/entry'

export default function Home({ entries }) {
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

        {entries.map(entry => {
         return ( <div>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
            <a href={entry.video}>Watch Video</a>
          </div>)
        })}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Entry.find({})
  const entries = result.map((doc) => {
    const entry = doc.toObject()
    entry._id = entry._id.toString()
    return entry
  })

  return { props: { entries: entries } }
}
