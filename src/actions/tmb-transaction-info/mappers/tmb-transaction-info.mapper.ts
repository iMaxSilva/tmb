export default function TmbTransactionInfoMapper(response: string) {
    const regex = /<tr\s+class='finance-list barlow finance_(\d+)'\s*>[\s\S]*?<td[^>]*>\s*([\s\S]*?)\s*<div\s+class='s-text text-secondary'>([\s\S]*?)<\/div>[\s\S]*?<\/td>[\s\S]*?<td[^>]*>\s*([\s\S]*?)\s*<\/td>[\s\S]*?<\/tr>/g;
    const transactions = [];

    let match;
    while ((match = regex.exec(response)) !== null) {
        const [_, typeCode, description, timestamp, amountStr] = match;

        const type = typeCode === '1' ? 'Expense' : 'Income';
        const formattedAmount = parseFloat(amountStr.replace(/[^0-9.-]+/g, ''));

        const transaction = {
            type,
            description: description.trim(),
            time: timestamp.trim(),
            amount: formattedAmount,
        };

        transactions.push(transaction);
    }

    return transactions;
}
