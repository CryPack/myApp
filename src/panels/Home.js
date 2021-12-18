import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

import './Home.css';

const Home = ({ id, go, fetchedUser}) => {
	const [fetchedData, setData] = useState(null);

    useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			let user = await bridge.send('VKWebAppGetUserInfo');
			const res = await fetch(`https://crypack.000webhostapp.com/get_user_data.php?id=${(user != null) ? user['id'] : null}`);
			let data = await res.json();
			setData(data);
			console.log(data);
		}
		fetchData();
	}, []);
	
	return (
	<Panel id={id}>
		<PanelHeader>Главное меню</PanelHeader>
		<Group header={<Header mode="secondary">Рандомная хуйня, не обращай внимания</Header>}>
			<Cell>
				id: {(fetchedData != null) ? fetchedData['id'] : 'жопа'}<br />
				nick: {(fetchedData != null) ? fetchedData['nick'] : 'хуй'}<br />
				money: {(fetchedData != null) ? fetchedData['money'] : '0'}
			</Cell>
		</Group>

		<Div className='Keyboard'>
			<Div className='Row1'>
				<Button stretched className='But1'>работа</Button>
				<Button stretched className='But1'>казино</Button>
				<Button stretched className='But1'>магазин</Button>
			</Div>
			<Div className='Row2'>
				<Button stretched className='But2'>дом</Button>
				<Button stretched className='But2'>бизнес</Button>
				<Button stretched className='But2'>донат</Button>
				<Button stretched className='But2'>карта</Button>
			</Div>
			<Div className='Row3'>
				<Button stretched mode='secondary' className='But3'>о</Button>
				<Button stretched mode='secondary' className='But3'>топ</Button>
				<Button stretched mode='secondary' className='But3' onClick={go} data-to='help'>помощь</Button>
				<Button stretched mode='secondary' className='But3'>н</Button>
			</Div>
		</Div>
	</Panel>
	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
