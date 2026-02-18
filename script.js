const rows = 10, cols = 10, minesCount = 15;
const gridElement = document.getElementById('grid');
let board = [];

// 1. Inicializar tablero con objetos de celda
function initBoard() {
    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => revealCell(r, c));
            gridElement.appendChild(cell);
            board[r][c] = { isMine: false, revealed: false, element: cell };
        }
    }
    plantMines();
}

// 2. Plantar minas aleatoriamente
function plantMines() {
    let planted = 0;
    while (planted < minesCount) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        if (!board[r][c].isMine) {
            board[r][c].isMine = true;
            planted++;
        }
    }
}

// 3. Revelar celda y lógica de victoria/derrota
function revealCell(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c].revealed) return;
    
    const cell = board[r][c];
    cell.revealed = true;
    cell.element.classList.add('revealed');

    if (cell.isMine) {
        cell.element.classList.add('mine');
        alert("¡BOOM! Juego terminado.");
        location.reload();
        return;
    }

    const mines = countAdjacentMines(r, c);
    if (mines > 0) {
        cell.element.innerText = mines;
    } else {
        // Expansión recursiva si no hay minas cerca
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                revealCell(r + dr, c + dc);
            }
        }
    }
}

// 4. Contar minas alrededor
function countAdjacentMines(r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            let nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
                count++;
            }
        }
    }
    return count;
}

initBoard();
