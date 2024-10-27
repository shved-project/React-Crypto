import {Layout, Typography} from "antd";

import {useCrypto} from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
	textAlign: "center",
	minHeight: "calc(100vh - 60px)",
	color: "#fff",
	backgroundColor: "#001529",
	padding: "1rem",
};

export default function AppContent() {
	const {assets} = useCrypto();
	const total = assets.reduce((sum, item) => {
		return +(sum + item.totalAmount).toFixed(2);
	}, 0);

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title level={3} style={{color: "#fff", textAlign: "left"}}>
				Portfolio: {total}$
			</Typography.Title>
			<PortfolioChart />
			<AssetsTable />
		</Layout.Content>
	);
}
