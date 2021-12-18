import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack } from '@vkontakte/vkui';

const Help = ({id, go}) => {
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
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to='home'></PanelHeaderBack>}>Помощь</PanelHeader>
        <Div>
                {(fetchedData != null) ? fetchedData['money'] : `saf`}
        </Div>
    </Panel>
    );
};

export default Help;