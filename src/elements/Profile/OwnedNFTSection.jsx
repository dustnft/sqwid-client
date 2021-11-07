import Card from "@elements/Default/Card";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import { respondTo } from "@styles/styledMediaQuery";
import AuthContext from "@contexts/Auth/AuthContext";
import React, { useEffect, useState, useContext } from "react";
import { Suspense } from "react";
import styled from "styled-components";
import axios from 'axios';

const Wrapper = styled.div`
	position: relative;
	margin-top: 9.5rem;
	padding: 0 6rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	flex:1;
	${respondTo.md`
		margin-top: 2rem;
		padding: 0 2rem;
	`}
`

const Header = styled.h1`
	display: flex;
	align-items: center;
	gap: 1rem;
	font-weight: 900;
`

const OwnedNFTSection = () => {
	const { auth } = useContext (AuthContext);
	const [items, setItems] = useState([]);

	useEffect (() => {
		const fetchData = async () => {
			const result = await axios (`${process.env.REACT_APP_API_URL}/get/r/marketplace/fetchMarketItems/owner/${auth.evmAddress}`);
			let items = result.data;
			setItems (items);
		}
		fetchData ();
	}, [auth.evmAddress]);
	return (
		<Wrapper>
			<Header>Owned NFTs </Header>
			<CardSectionContainer>
				<Suspense>
					{items.map((item,index)=>(
						<Card
							key={index}
							data={item}
							collections
						/>
					))}
				</Suspense>
			</CardSectionContainer>
		</Wrapper>
	)
}

export default OwnedNFTSection
