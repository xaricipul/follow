

let defaultRate = 1.2;

let usernames = new Map();
let connection = new TikTokIOConnection(undefined);
let nextId = 1;
userList = [];

let messagesQueue = [];
$(document).ready(() => {

    setTimeout(function () {
        let targetLive = "mameemacheer";
        connect(targetLive);
    }, 5000);

})

function connect(targetLive) {
    if (targetLive !== '') {
        $('#stateText').text('Qoşulur...');
        $("#usernameTarget").html("@" + targetLive);
        connection.connect(targetLive, {
            enableExtendedGiftInfo: true
        }).then(state => {
            $('#stateText').text(`Xoş gəldin... ${state.roomId}`);
        }).catch(errorMessage => {
            $('#stateText').text(errorMessage);
        })
    } else {
        alert('İstifadəçi adını daxil et');
    }
}

connection.on('chat', (data) => {

    let userName = data.uniqueId;
    let profilePictureUrl = data.profilePictureUrl;
    let userlistExist = false;
});

connection.on('like', (data) => {
    let userName = data.uniqueId;
    let likeCount = data.likeCount;
    let profilePictureUrl = data.profilePictureUrl;
    let userlistExist = false;

    let totalLikeCount = data.totalLikeCount;


    previousLikeCount = totalLikeCount;

    messagesQueue = messagesQueue.filter(item => item.type !== 'random');

    const randomMessage = getRandomMessage();

    let cleanNickname = data.nickname.replace(/[_\$-.]/g, '');
    cleanNickname = cleanNickname.replace(/ə/g, 'e');
    cleanNickname = cleanNickname.replace(/x/g, 'k');
    if (cleanNickname.startsWith('user')) {
        cleanNickname = 'user';
    }
    let end = { text: cleanNickname + randomMessage.text, language: randomMessage.language, type: 'like' };

    if (!usernames.has(userName)) {
        messagesQueue.push(end);
        processQueue();
    }
    lakaka1(userName);

});

let availableMessages = [
    { text: "İlk üçe gir ve takip al", language: "tr" },
    { text: "Hepinize Teşekkür ederim", language: "tr" },
    { text: "katılmak için en az on jeton atmalısın", language: "tr" },
    { text: "bir birinize destek olun", language: "tr" },
    { text: "ondan aşağı jeton gönderenlere takipçi gönderilmiyor", language: "tr" },
    { text: "Hesabımı takip et hesabın ekranda görünsün", language: "tr" },
    { text: "Beğeni ve gül gönderenleri takip et", language: "tr" },
    { text: "Canlını paylaş", language: "tr" },
    { text: "Yorum yaz, karşılığında takip etsinler", language: "tr" },
    { text: "Gül atanların hesabı daha çabuk büyüyor", language: "tr" },

    { text: "Harikasınız", language: "tr" },
    { text: "Birlikte büyüyelim, beğen ve takip et", language: "tr" },
    { text: "Topluluğa katıl, takip et ve etkileşime gir", language: "tr" },
    { text: "Beğen ve yorum yap, karşılığında takip ederim", language: "tr" },
    { text: "Bağlantıda kal, takip et ve paylaş", language: "tr" },
    { text: "Güncellemeler için bildirimleri aç", language: "tr" },
    { text: "Gül atanların hesabı daha çabuk büyüyor", language: "tr" },
    { text: "Hesabı ekranda görüntülenene toplu takip gönderin", language: "tr" },
    { text: "Hesabımı takip et hesabın ekranda görünsün", language: "tr" },

    { text: "Müthişsiniz, teşekkürler", language: "tr" },
    { text: "Pozitif enerjiyi sürdür, beğen ve takip et", language: "tr" },
    { text: "Birlikte daha güçlüyüz, destekle ve takip et", language: "tr" },
    { text: "Daha fazla içerik için takipte kal", language: "tr" },
    { text: "Yeni arkadaşlar keşfet, takip et ve etkileşime gir", language: "tr" },
    { text: "Birbirimize ilham verelim, beğen ve takip et", language: "tr" },
    { text: "Özel içerik için takip et", language: "tr" },

    { text: "Hesabı görüntülenene toplu takip gönderin", language: "tr" },
    { text: "Hesabımı takip et hesabın ekranda görünsün", language: "tr" },
    { text: "Hesabımı takip et hesabın ekranda görünsün", language: "tr" },
    { text: "Beğeni bırak, takipçi kazan", language: "tr" },
    { text: "Harika işler çıkarmaya devam edin, teşekkürler", language: "tr" },
    { text: "Hesabı görüntülenene toplu takip gönderin", language: "tr" },
    { text: "Hesabımı takip et hesabın ekranda görünsün", language: "tr" },

    { text: "Sohbete katıl, yorum yap ve takip et", language: "tr" },
    { text: "Güncel kal, takip et ve bildirimleri aç", language: "tr" },
    { text: "Takip et ve düşüncelerini paylaş", language: "tr" },
    { text: "Hesabı görüntülenene toplu takip gönderin", language: "tr" },
    { text: "yayımı beğenenin hesabı ekranda görüntüleniyor", language: "tr" },
    { text: "Karşılıklı destek için beğen ve yorum yap", language: "tr" },
    { text: "Pozitif bir topluluk oluştur, takip et ve etkileşime gir", language: "tr" },
    { text: "Desteğiniz için teşekkür ederiz", language: "tr" },
    { text: "gül gönderenin hesabını seslendiriyorum", language: "tr" },
    { text: "Lütfen yayımı beyenin", language: "tr" },
    { text: "Hesabı görüntülenene toplu takip gönderin", language: "tr" },
    { text: "ekranda yaşıl rengte görünen hesablara takipçi gönderilmeye başlamışdır", language: "tr" },
    { text: "Sandık koy daha çok takipçi kazan", language: "tr" },
    { text: "takipçiler bir saatla dört saat arasında tamamen ulaşıyo", language: "tr" },
    { text: " on jetona on gönderiliyor ", language: "tr" },
    { text: " katılmak için en az on jeton atmalısınız ", language: "tr" },
];
let usedMessages = [];

function getRandomMessage() {
    if (availableMessages.length === 0) {
        availableMessages = usedMessages;
        usedMessages = [];
    }

    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    const selectedMessage = availableMessages[randomIndex];

    availableMessages.splice(randomIndex, 1);
    usedMessages.push(selectedMessage);

    return selectedMessage;
}

function add_takip(user_name, number) {
    console.e
    fetch('http://95.217.210.174:2929/add_takip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({ user_name, number })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Followers added successfully:', data);
        })
        .catch(error => {
            console.error('Error adding followers:', error);
        });
}


function checkUser(userNameList) {
    fetch('http://95.217.210.174:2929/check_order', {
        method: 'POST',
        headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({ userNameList })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Check result for userNameList:', data);

            if (Array.isArray(data)) {
                userList = userList.map(user => {
                    let matchedData = data.find(item => item.userName === user.userName );
                    if (matchedData) {
                        return {
                            ...user,
                            sendFollowCount: 5,
                            active: matchedData.active
                        };
                    }
                    return user; 
                });

                console.log('Updated userList:', userList);
            } else {
                console.error('Beklenmeyen veri formatı:', data);
            }
        })
        .catch(error => {
            console.error('Kullanıcı listesini kontrol ederken hata oluştu:', error);
        });
}

setInterval(() => {
    let activeUsers = userList.filter(user => user.active === 1);

    checkUser(activeUsers);
}, 30000); 

connection.on('gift', (data) => {
    let userName = data.uniqueId;
    let giftCount = (data.diamondCount * data.repeatCount);
    if (!isPendingStreak(data) && data.diamondCount > 0) {
        let cleanNickname = data.nickname.replace(/[_\$-.]/g, '');
        cleanNickname = cleanNickname.replace(/ə/g, 'e');
        cleanNickname = cleanNickname.replace(/x/g, 'k');
        if (cleanNickname.startsWith('user')) {
            cleanNickname = 'user';
        }

        let userFound = false;

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === userName) {
                userFound = true;
                const followCount = calculateFollowCount(giftCount);
                userList[i].giftCount += giftCount;
                userList[i].followCount += followCount;
                userList[i].active = userList[i].giftCount >= 10 ? 1 : 0;

                if (userList[i].active) {
                    add_takip(userList[i].username, userList[i].followCount);
                }

                const responses = [
                    { text: cleanNickname + " takipçilerini artırmağa devam ediyor ", language: "tr", type: 'like' },
                    { text: cleanNickname + " Kendini gÖsteriyor her kes takip atsın", language: "tr", type: 'like' },
                    { text: cleanNickname + " desteyiniz üçün teşükker ederiz.", language: "tr", type: 'like' },
                    { text: cleanNickname + " ekranda yaşıl rengte görünen hesablara takipçi gönderilmeye başlamışdır ", language: "tr", type: 'like' },
                    { text: cleanNickname + " takipçiler bir saatla dört saat arasında tamamen ulaşıyor ", language: "tr", type: 'like' },
                    { text: cleanNickname + " on jetona on gönderiliyor ", language: "tr", type: 'like' },
                    { text: cleanNickname + " katılmak için en az on jeton atmalısınız ", language: "tr", type: 'like' }
                ];

                function getRandomResponse(responses) {
                    const randomIndex = Math.floor(Math.random() * responses.length);
                    return responses[randomIndex];
                }

                const response = getRandomResponse(responses);

                if (response && !usernames.has(cleanNickname)) {
                    messagesQueue.push(response);
                    processQueue();
                }
                lakaka1(cleanNickname);
                break;
            }
        }

        if (!userFound) {
            const followCount = calculateFollowCount(giftCount);

            const user = {
                username: userName,
                giftCount: giftCount,
                followCount: followCount,
                sendFollowCount: 0,
                active: giftCount >= 10 ? true : false,
                isNew: true
            };

            userList.push(user);
            showModal(userName, followCount);
            updateFollowersList();
            scrollToBottom();
            if (user.active) {
                add_takip(user.username, user.followCount);
            }
        }
    }
});

// async function callApiForFollowCount(username, followCount) {
//     try {
//         // Replace 'API_ENDPOINT_FOR_50' with the actual endpoint URL
//         const response = await axios.post('API_ENDPOINT_FOR_50', {
//             username: username,
//             followCount: followCount
//         });

//         // Log the response for debugging purposes
//         console.log(`API called for ${username} with followCount 50 or more. Response:`, response.data);
//     } catch (error) {
//         console.error(`Error calling API for ${username} with followCount 50 or more: ${error.message}`);
//     }
// }


function calculateFollowCount(giftCount) {
    return giftCount + (Math.floor(giftCount / 100) * 10);
}


// CheckOrder();
function onEnd() {
    messagesQueue.shift();
    processQueue();
}


function processQueue() {
    if (messagesQueue.length > 0) {
        if (!responsiveVoice.isPlaying()) {
            let message = messagesQueue[0].text;
            let language = messagesQueue[0].language;

            switch (language) {
                case 'tr':
                    responsiveVoice.speak(message, "Turkish Male", { rate: defaultRate, onend: onEnd });
                    break;
                case 'en':
                    responsiveVoice.speak(message, "UK English Male", { rate: defaultRate, onend: onEnd });
                    break;

                default:
                    responsiveVoice.speak(message, "Turkish Male", { rate: defaultRate, onend: onEnd });
                    break;
            }
        } else {
            messagesQueue.shift();
            processQueue();
        }
    }
}


window.addEventListener("load", async () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.resume();


    } catch (error) {
        console.error("Otomatik seslendirme başlatılamadı:", error);
    }
});



function lakaka1(username) {
    if (usernames.has(username)) {
        return;
    }

    usernames.set(username, Date.now());

    setTimeout(() => {
        const timestamp = usernames.get(username);
        if (Date.now() - timestamp >= 30000) {
            usernames.delete(username);
        }
    }, 30000);

}

function isPendingStreak(data) {
    return data.giftType === 1 && !data.repeatEnd;
}

connection.on('streamEnd', () => {
    $('#stateText').text('Canlı sona çatdı.');
})
