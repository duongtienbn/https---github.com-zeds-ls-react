import styled from 'styled-components'
import { DISPLAY_LG } from '../../GlobalStyle'



export const IntroduceContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`
export const TopContainer = styled.div`
    display: flex;
	justify-content: center;
	width: 100%;
	flex-direction: column;
	align-items: center;
	gap: 34px;
    
`

export const TopBox = styled.div`
	display: flex;
	width: 100%;
	height: 428px;
	justify-content: center;
	align-items: flex-start;
	gap: 35px;
	@media(max-width : ${DISPLAY_LG}){
		flex-direction: column;
		align-items: center;
		height: 950px;
	}
`