CREATE TABLE zreport (
    hour INT,
    id SERIAL PRIMARY KEY,
    cost INT,
    order_id INT
    );

    TRUNCATE TABLE zreport;
    INSERT INTO zreport (hour, cost, order_id)
    SELECT hour, cost, id
    FROM xreport;

    DELETE FROM xreport;