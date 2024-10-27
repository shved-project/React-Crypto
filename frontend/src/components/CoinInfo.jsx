import {Flex, Typography} from "antd";

export default function CoinInfo({coin, withSymbol}) {
	return (
		<Flex alignitems={"center"} gap={10}>
			<img src={coin.icon} alt={coin.name} style={{width: 40}} />
			<Typography.Title level={2} style={{margin: 0}}>
				{withSymbol && <span>({coin.symbol})</span>} {coin.name}
			</Typography.Title>
		</Flex>
	);
}
