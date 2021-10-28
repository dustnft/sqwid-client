import React from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion"

const NFTCardContainer = styled(m.div)`
	cursor: pointer;
	user-select:none;
	background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%), url(${props=>props.src&&props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	border-radius: 1rem;
	height: 100%;
	padding: 1.5rem 1.25rem;
	min-width: 10rem;
	&:first-child{
		grid-column: span 1;
		grid-row-start: span 2;
		min-width: 16rem;
	}
	h1{
		font-size: ${props=>props.fullHeight?`1.75rem`:`1.125rem`};
		font-weight: ${props=>props.fullHeight?`900`:`800`};
	}
	h4{
		font-size: ${props=>props.fullHeight?`1em`:`0.75rem`};
		margin-top: 0.25rem;
		font-weight: 200;
	}
`

const NFTCard = ({ src, title, author, fullHeight }) => {
	return (
		<LazyMotion features={domAnimation}>
			<NFTCardContainer
				fullHeight={fullHeight}
				src={src}
				whileHover={{
					y: -10,
					x: 0,
					scale:1.02
				}}
				whileTap={{
					scale:0.99
				}}
				transition={{
					type: "tween",
					ease:"backOut",
				}}
			>
				<h1>{title}</h1>
				<h4>by {author}</h4>
			</NFTCardContainer>
		</LazyMotion>
	)
}

export default React.memo(NFTCard)