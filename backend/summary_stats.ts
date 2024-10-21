import { Request, Response } from 'express';
import db from './db';

const fetchSummary = (req: Request, res: Response) => {
    const query1 = "SELECT COUNT(DISTINCT Client_ID) as clientCount FROM Orders";
    const query2 = "SELECT COUNT(Product_ID) as productCount FROM Product";
    const query3 = "SELECT COUNT(Order_ID) as inProgressCount FROM Orders WHERE Status = 'In Progress'";
    const query4 = "SELECT COUNT(Order_ID) as completedOrShippedCount FROM Orders WHERE Status = 'Complete' OR Status = 'Shipped'";
    const query5 = "SELECT COUNT(Order_ID) as orderCount FROM Orders";
    const query6 = "SELECT COUNT(*) as supplierCount FROM Supplier";
    const query7 = "SELECT COUNT(*) as inProgressSupplierOrderCount FROM Supplier_Orders WHERE Status = 'In Progress'";
    const query8 = "SELECT SUM(Quantity) as shippedOrCompletedQuantity FROM Order_Line JOIN Orders ON Orders.Order_ID = Order_Line.Order_ID AND (Orders.Status = 'Complete' OR Orders.Status = 'Shipped')";
    const query9 = "SELECT COUNT(*) as employeeCount FROM Employee";

    const executeQuery = (query: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    Promise.all([
        executeQuery(query1),
        executeQuery(query2),
        executeQuery(query3),
        executeQuery(query4),
        executeQuery(query5),
        executeQuery(query6),
        executeQuery(query7),
        executeQuery(query8),
        executeQuery(query9),
    ])
    .then((results) => {
        const responseData = {
            countClients: results[0][0].clientCount,
            countProducts: results[1][0].productCount,
            countInProgressOrders: results[2][0].inProgressCount,
            countCompletedAndShippedOrders: results[3][0].completedOrShippedCount,
            countAllOrders: results[4][0].orderCount,
            countSuppliers: results[5][0].supplierCount,
            countInProgressSupplierOrders: results[6][0].inProgressSupplierOrderCount,
            sumCompletedAndShippedOrdersQuantity: results[7][0].shippedOrCompletedQuantity,
            countEmployees: results[8][0].employeeCount,
        };
        res.json(responseData);
    })
    .catch((error) => {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });
};

export default fetchSummary;
