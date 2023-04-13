/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

interface Pokemon {
	id: number;
	name: string;
	image: string;
}

export async function getServerSideProps() {
	const response = await fetch(
		'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
	);

	return {
		props: {
			pokemon: await response.json()
		}
	};
}

export default function Home({ pokemon }: { pokemon: Pokemon[] }) {
	return (
		<>
			<Head>
				<title>Pokemon List</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h2>Pokemon List </h2>
			<main className={styles.main}>
				<div className={styles.grid}>
					{pokemon.map((pokemon) => (
						<div className={styles.card} key={pokemon.id}>
							<Link href={`/pokemon/${pokemon.id}`}>
								<img
									src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image} `}
									alt={pokemon.name}
								/>
								<h3>{pokemon.name}</h3>
							</Link>
						</div>
					))}
				</div>
			</main>
		</>
	);
}
