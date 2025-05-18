// Lottery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load lottery items on listings page
    const lotteryGrid = document.getElementById('lotteryGrid');
    
    if (lotteryGrid) {
        const lotteries = [
            {
                id: 1,
                title: "Toyota Camry 2023",
                image: "images/car.png",
                value: "₦12,000,000",
                ticketPrice: "₦5,000",
                ticketsSold: 1834,
                totalTickets: 2400,
                drawDate: "Dec 25, 2023"
            },
            {
                id: 2,
                title: "iPhone 15 Pro Max",
                image: "images/iphone.png",
                value: "₦1,200,000",
                ticketPrice: "₦1,000",
                ticketsSold: 856,
                totalTickets: 1200,
                drawDate: "Dec 18, 2023"
            },
            {
                id: 3,
                title: "₦5,000,000 Cash",
                image: "images/cash.png",
                value: "₦5,000,000",
                ticketPrice: "₦2,500",
                ticketsSold: 1245,
                totalTickets: 2000,
                drawDate: "Dec 20, 2023"
            }
        ];
        
        lotteryGrid.innerHTML = lotteries.map(lottery => 
            <div class="lottery-card">
                <img src="${lottery.image}" alt="${lottery.title}">
                <div class="lottery-info">
                    <h3>${lottery.title}</h3>
                    <div class="lottery-price">
                        <p class="value">Value: ${lottery.value}</p>
                        <p class="ticket">Ticket: ${lottery.ticketPrice}</p>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress" style="width: ${(lottery.ticketsSold / lottery.totalTickets) * 100}%"></div>
                        </div>
                        <div class="progress-text">
                            <span>${lottery.ticketsSold} sold</span>
                            <span>${lottery.totalTickets - lottery.ticketsSold} remaining</span>
                        </div>
                    </div>
                    <div class="lottery-draw">
                        <p>Draw: ${lottery.drawDate}</p>
                        <a href="draw.html?id=${lottery.id}" class="btn-primary">Enter Now</a>
                    </div>
                </div>
            </div>
        ).join('');
    }
    
    // Draw simulation on draw page
    const startDrawBtn = document.getElementById('startDraw');
    
    if (startDrawBtn) {
        startDrawBtn.addEventListener('click', function() {
            const drawNumber = document.getElementById('drawNumber');
            const winnerInfo = document.getElementById('winnerInfo');
            
            // Disable button during draw
            startDrawBtn.disabled = true;
            startDrawBtn.textContent = "Drawing...";
            
            // Simulate drawing animation
            let counter = 0;
            const drawInterval = setInterval(() => {
                // Generate random ticket number
                const randomTicket = LD-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 900)};
                
                // Update display
                drawNumber.children[3].textContent = randomTicket[3];
                drawNumber.children[4].textContent = randomTicket[4];
                drawNumber.children[5].textContent = randomTicket[5];
                drawNumber.children[6].textContent = randomTicket[6];
                drawNumber.children[7].textContent = randomTicket[7];
                drawNumber.children[9].textContent = randomTicket[9];
                drawNumber.children[10].textContent = randomTicket[10];
                drawNumber.children[11].textContent = randomTicket[11];
                
                counter++;
                
                // Stop after 20 iterations
                if (counter > 20) {
                    clearInterval(drawInterval);
                    
                    // Set final winning number
                    const winningTicket = LD-18345-729;
                    document.getElementById('winningTicket').textContent = winningTicket;
                    
                    // Show winner info
                    winnerInfo.style.display = 'block';
                    
                    // Reset button
                    startDrawBtn.disabled = false;
                    startDrawBtn.textContent = "Draw Complete";
                }
            }, 100);
        });
    }
});