import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "@contexts/Auth/AuthContext";
import styled from 'styled-components';
import { getAvatarFromId } from "@utils/getAvatarFromId"
import ReefIcon from '@static/svg/ReefIcon';
import { DividerHorizontal } from '@elements/Default/Divider';
import { Link } from 'react-router-dom';
import { getBalance } from '@utils/getBalance';
import { numberSeparator } from '@utils/numberSeparator';
import FadeLoaderIcon from '@static/svg/FadeLoader';
import constants from '@utils/constants';
import bread from '@utils/bread';

const BasicDetailsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
    padding: 0.5rem 0;
    cursor: pointer;
    border-radius: 0.5rem;
	color: var(--app-text);
	text-decoration: none;
	user-select: none;
`

const NotStyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`

const ProfilePicture = styled.div`
	height: 3rem;
	width: 3rem;
	border-radius: 1000rem;
	outline: 0.125rem solid white;
	background-color: var(--app-background);
	background-image: url('${props => props.url && props.url}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
`

const ProfileDetails = styled.div`
	max-width: 10rem;
`

const ProfileAddress = styled.h4`
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-family: var(--font-family-mono);
	font-weight: 400;
	font-size: 1rem;
	color: var(--app-container-text-primary-hover);
`

const ProfileName = styled.h3`
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`

const BalanceContainer = styled.div`
	display: flex;
	align-items: center;
	svg:not(.loader){
		width: 24px;
		height: 24px;
	}
`

const BalanceWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* padding: 0 1rem; */
`

const Balance = () => {
	const [balance, setBalance] = useState(localStorage.getItem(`${constants.APP_NAME.toLowerCase()}__balance`) || <FadeLoaderIcon />);
	useEffect(() => {
		const fetchBalance = async () => {
			const bal = await getBalance();
			const balNum = Number(bal) / 10 ** 18;
			setBalance(numberSeparator(balNum.toFixed(2).toString()));
			localStorage.setItem(`${constants.APP_NAME.toLowerCase()}__balance`, numberSeparator(balNum.toFixed(2).toString()))
		}
		fetchBalance();
	}, []);
	return (
		<BalanceWrapper>
			<h4>Balance</h4>
			<BalanceContainer><ReefIcon /> <span>{balance}</span></BalanceContainer>
		</BalanceWrapper>
	)
}

const ProfileElement = () => {
	const [username, setUsername] = useState("");
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		auth && setUsername(auth.meta.name)
	}, [auth])
	const copyAddress = () => {
		navigator.clipboard.writeText(auth.evmAddress)
			.then(() => {
				bread(<p style={{ lineHeight: "1", fontWeight: "900", color: "var(--app-container-text-primary-hover)" }}>Copied address to clipboard!</p>)
			})
	}
	return (
		<>
			<BasicDetailsContainer>
				<NotStyledLink
					to="/profile"
				><ProfilePicture url={getAvatarFromId(auth.address)} /></NotStyledLink>
				<ProfileDetails >
					<NotStyledLink
						to="/profile"
					><ProfileName title={username}>{username}</ProfileName></NotStyledLink>
					<ProfileAddress onClick={copyAddress} title={auth.evmAddress}>{auth.evmAddress}</ProfileAddress>
				</ProfileDetails>
			</BasicDetailsContainer>
			<DividerHorizontal />
			<Balance />
			<DividerHorizontal />
		</>
	)
}

export default ProfileElement;