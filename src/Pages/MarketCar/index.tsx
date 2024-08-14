'use client'
import React, { useState } from 'react'
import '../MarketCar/MarketCar.css'

interface ICurso {
    id: number,
    titulo: string,
    preco: number
}

interface IShoppingItem {
    produto: ICurso,
    quantidade: number
}

const cursos: ICurso[] = [
    { id: 1, titulo: 'Iphone 12', preco: 3500.00 },
    { id: 2, titulo: 'Samsung S23', preco: 4000.00 },
    { id: 3, titulo: 'Iphone 14', preco: 4500.00 },
    { id: 4, titulo: 'Samsung S22', preco: 2900.00 }
]

const formatarPreco = (preco: number): string => preco.toFixed(2);

const CarMarketPage = () => {
    const [shoppingCurso, setShoppingCurso] = useState<IShoppingItem[]>([])

    const handleAddCurso = (id: number) => {
        const curso = cursos.find((curso) => curso.id === id)
        const cursoExisteShopping = shoppingCurso.find(item => item.produto.id === id)

        if (cursoExisteShopping) {
            const newShoppingCurso: IShoppingItem[] = shoppingCurso.map(item => {
                if (item.produto.id === id) {
                    return {
                        ...item,
                        quantidade: item.quantidade + 1
                    }
                }
                return item
            })
            setShoppingCurso(newShoppingCurso)
            return
        }

        const carItem: IShoppingItem = {
            produto: curso!,
            quantidade: 1
        }

        const newShoppingCurso: IShoppingItem[] = [...shoppingCurso, carItem]
        setShoppingCurso(newShoppingCurso)
    }

    const handleRemoveCurso = (id: number) => {
        const ExisteCursoShopping = shoppingCurso.find((item) => item.produto.id === id)

        if (ExisteCursoShopping!.quantidade > 1) {
            const newShoppingCurso: IShoppingItem[] = shoppingCurso.map(item => {
                if (item.produto.id === id) {
                    return {
                        ...item,
                        quantidade: item.quantidade - 1
                    }
                }
                return item
            })
            setShoppingCurso(newShoppingCurso)
            return
        }

        const newShoppingCurso: IShoppingItem[] = shoppingCurso.filter(item => item.produto.id !== id)
        setShoppingCurso(newShoppingCurso)
    }

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Imprimir Carrinho</title>');
            printWindow.document.write('<style>');
            printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
            printWindow.document.write('h1 { text-align: center; font-size: 24px; margin-bottom: 20px; }');
            printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }');
            printWindow.document.write('th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }');
            printWindow.document.write('th { background-color: #f4f4f4; }');
            printWindow.document.write('tr:nth-child(even) { background-color: #f9f9f9; }');
            printWindow.document.write('tfoot td { font-weight: bold; }');
            printWindow.document.write('</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<h1>Nota Fiscal</h1>');
            printWindow.document.write('<table>');
            printWindow.document.write('<thead><tr><th>Título</th><th>Preço</th><th>Quantidade</th><th>Total</th></tr></thead>');
            printWindow.document.write('<tbody>');
            shoppingCurso.forEach(item => {
                printWindow.document.write(`<tr>
                    <td>${item.produto.titulo}</td>
                    <td>R$ ${formatarPreco(item.produto.preco)}</td>
                    <td>${item.quantidade}</td>
                    <td>R$ ${formatarPreco(item.produto.preco * item.quantidade)}</td>
                </tr>`);
            });
            printWindow.document.write('</tbody>');
            printWindow.document.write('<tfoot><tr><td colspan="3">Total Geral:</td><td>R$ ' + formatarPreco(totalCurso) + '</td></tr></tfoot>');
            printWindow.document.write('</table>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    const totalCurso = shoppingCurso.reduce((total, item) => {
        return total + (item.produto.preco * item.quantidade);
    }, 0)

    return (
        <div>
            <h1>Urubu do Senai</h1>
            <ul>
                {cursos.map(curso => (
                    <li key={curso.id}>
                        <p>{curso.titulo}</p>
                        <p>Preço: R$ {formatarPreco(curso.preco)}</p>
                        <button onClick={() => handleAddCurso(curso.id)}>Adicionar</button>
                    </li>
                ))}
            </ul>
            <h1>Valor total: R$ {formatarPreco(totalCurso)}</h1>
            <button onClick={handlePrint}>Imprimir Carrinho</button>
            <ul>
                {shoppingCurso.map(item => (
                    <li key={item.produto.id}>
                        <p>Título: {item.produto.titulo}</p>
                        <p>Preço: R$ {formatarPreco(item.produto.preco)}</p>
                        <p>Quantidade: {item.quantidade}</p>
                        <p>Total: R$ {formatarPreco(item.produto.preco * item.quantidade)}</p>
                        <button onClick={() => handleRemoveCurso(item.produto.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CarMarketPage
