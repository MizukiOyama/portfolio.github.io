// jQueryがロードされるまで待機する
function waitForJQuery(callback) {
    if (window.jQuery) {
        callback(jQuery);
    } else {
        setTimeout(function () {
            waitForJQuery(callback);
        }, 50);
    }
}

// jQueryがロードされた後に実行する関数
waitForJQuery(function ($) {
    $(document).ready(function () {
        const slideElements = ['.back__slide', '.card__slide', '.content__slide'];
        let inProgress = false;

        const goToSlide = (slideElements, index) => {
            if (!inProgress) {
                inProgress = true;

                $('.active').addClass('exit');
                $('.active').removeClass('active');
                slideElements.forEach(elem => {
                    $(`${elem}:nth-child(${index})`).addClass('active');
                });

                const evenSlide = index % 2 === 0;
                if (evenSlide)
                    $('.content__ping').addClass('content__ping--right');
                else
                    $('.content__ping').removeClass('content__ping--right');
                $('.content__ping--noanimation').removeClass('content__ping--noanimation');

                setTimeout(() => $('.exit').removeClass('exit'), 1500);
                setTimeout(() => inProgress = false, 3000);
            }
        };

        $('.content__slide:nth-child(1) .button').on('click', () => goToSlide(slideElements, 2));
        $('.content__slide:nth-child(2) .button').on('click', () => goToSlide(slideElements, 1));

        setTimeout(() => goToSlide(slideElements, 2), 2000);
        setTimeout(() => goToSlide(slideElements, 1), 6000);

        // リンクに.activeクラスを追加し、対応するコンテンツを表示する
        $('.head a').each(function(index) {
            $(this).on('click', function(event) {
                event.preventDefault(); // リンクのデフォルト動作をキャンセル
                $('.head a').removeClass('active');
                $(this).addClass('active');
                
                // 対応するコンテンツを切り替える
                $('.toggle-content').removeClass('active');
                $('.toggle-content').eq(index).addClass('active');
                $('.toggle-content').eq(index + 1).addClass('active');
            });
        });

        // パリの時刻を更新する関数
        function updateParisTime() {
            var now = new Date();
            var utc = now.getTime() + (now.getTimezoneOffset() * 60000); // Corrected to 60000 (milliseconds)
            var parisTime = new Date(utc + (3600000 * 2)); // UTC+2（夏時間）またはUTC+1（冬時間）を調整

            var hours = parisTime.getHours().toString().padStart(2, '0');
            var minutes = parisTime.getMinutes().toString().padStart(2, '0');
            var seconds = parisTime.getSeconds().toString().padStart(2, '0');

            $('#paris-time').text(`${hours}:${minutes}:${seconds}`);
        }

        setInterval(updateParisTime, 1000);
        updateParisTime();
    });
});
