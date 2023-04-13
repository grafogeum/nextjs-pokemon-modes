/* eslint-disable @next/next/no-img-element */
import { GetServerSidePropsContext } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Details.module.css';

interface Pokemon {
	id: number | string;
	name: string;
	image: string;
	type: string[];
	stats: {
		name: string;
		value: number;
	}[];
}

export async function getServerSideProps({
	params
}: GetServerSidePropsContext) {
	const response = await fetch(
		`https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${params?.id}.json`
	);

	return {
		props: {
			pokemon: await response.json()
		}
	};
}

export default function Details({ pokemon }: { pokemon: Pokemon }) {
	!pokemon && null;

	return (
		<div>
			<Head>
				<title>Pokemon List</title>
			</Head>
			<div>
				<Link href="/">
					<p>Back to Home</p>
				</Link>
			</div>
			<div className={styles.layout}>
				<div>
					<img
						className={styles.picture}
						src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image}`}
						alt={pokemon?.name}
					/>
				</div>
				<div>
					<div className={styles.name}> {pokemon?.name}</div>
					<div className={styles.type}>{pokemon?.type.join(', ')}</div>
					<table>
						<thead className={styles.header}>
							<tr>
								<th>Name</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{pokemon &&
								pokemon.stats.map(({ name, value }) => (
									<tr key={name}>
										<td className={styles.attribute}>{name}</td>
										<td>{value}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
