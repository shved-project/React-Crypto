import {Layout, Card, Statistic, List, Tag} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

import {capitalize} from "../../utils";
import {useCrypto} from "../../context/crypto-context";

const siderStyle = {
	padding: "1rem",
};

export default function AppSider() {
	const {assets} = useCrypto();

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			{assets.map((asset) => (
				<Card style={{marginBottom: "1rem"}} key={asset.id}>
					<Statistic
						title={capitalize(asset.id)}
						value={asset.totalAmount}
						precision={2}
						valueStyle={{color: asset.grow ? "#3f8600" : "#cf1322"}}
						prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix='$'
					/>
					<List
						size='small'
						dataSource={[
							{title: "Total Profit", value: asset.totalProfit, withTag: true},
							{title: "Asset Amount", value: asset.amount, isPlain: true},
						]}
						renderItem={(item) => (
							<List.Item>
								<span>{item.title}</span>
								<span>
									{item.withTag && (
										<Tag color={asset.grow ? "green" : "red"}>{asset.growPercent}%</Tag>
									)}
									{item.isPlain && item.value}
								</span>
							</List.Item>
						)}
					/>
				</Card>
			))}
		</Layout.Sider>
	);
}
