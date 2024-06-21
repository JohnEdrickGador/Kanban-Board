CREATE TABLE Tasks(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    task VARCHAR(255)
    progress VARCHAR(255)
)

USE Tasks;

INSERT INTO Tasks (task, progress)
VALUES 
('task 1', 'Backlog'),
('task 2', 'Backlog'),
('task 3', 'Done');