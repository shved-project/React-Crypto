import {useEffect, useState} from "react";

import {Layout, Select, Space, Button, Modal, Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
	textAlign: "center",
	height: 60,
	padding: "1rem",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};

export default function AppHeader() {
	const [select, setSelect] = useState(false);
	const [coin, setCoin] = useState(null);
	const [modal, setModal] = useState(false);
	const [drawer, setDrawer] = useState(false);
	const {crypto} = useCrypto();

	useEffect(() => {
		const keyPress = (event) => {
			if (event.key === "/") {
				setSelect((prev) => !prev);
			}
		};

		document.addEventListener("keypress", keyPress);
		return () => document.removeEventListener("keypress", keyPress);
	}, [select]);

	function handleSelect(value) {
		setCoin(crypto.find((c) => c.id === value));
		setModal(true);
	}

	return (
		<Layout.Header style={headerStyle}>
			<Select
				style={{
					width: 250,
				}}
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect((prev) => !prev)}
				value='press / to open'
				options={crypto.map((coin) => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={(option) => (
					<Space>
						<img src={option.data.icon} alt={option.data.label} style={{width: 20}} /> {option.data.label}
					</Space>
				)}
			/>
			<Button onClick={() => setDrawer(true)} type='primary'>
				Add Asset
			</Button>

			<Modal open={modal} footer={null} onCancel={() => setModal(false)}>
				<CoinInfoModal coin={coin} />
			</Modal>

			<Drawer width={600} title='Add Asset' onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
				<AddAssetForm onClose={() => setDrawer(false)} />
			</Drawer>
		</Layout.Header>
	);
}
