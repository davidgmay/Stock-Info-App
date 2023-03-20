import React, { useState } from 'react'
import { TextInput } from "@tremor/react";
import { SearchIcon } from "@heroicons/react/solid";


import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Title,
    Badge,
} from "@tremor/react";


function Fetch() {
    const [info, setInfo] = useState()
    const [text, setText] = useState()

    function search(event) {
        if (event.key === 'Enter') {
            fetch(`https://api.iex.cloud/v1/data/CORE/HISTORICAL_PRICES/${text.toUpperCase()}?token=sk_8674d49723b34cffb5fd0b49dff00030`)
                .then((response) => response.json())
                .then((json) => setInfo(json))
                .catch((error) => `${error}`)

        }
    }


    return (
        <div>

            <TextInput
                onChange={event => setText(event.target.value)}
                onKeyPress={search}
                placeholder='Enter Symbol (ex."AAPL")'
                type="text" />


            <Card>
                <Title>Stock Info</Title>
                <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Open Price</TableHeaderCell>
                            <TableHeaderCell>Change In Price</TableHeaderCell>
                            <TableHeaderCell>Percentage Change</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {info && info.map((item) => (
                            <TableRow >
                                <TableCell>{item.symbol}</TableCell>
                                <TableCell>
                                    <Text>${item.open}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>${item.close - item.open}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>
                                        {((item.close - item.open) / item.open) * 100} %
                                    </Text>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

        </div>
    )
}

export default Fetch