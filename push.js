var webPush = require('web-push');

const vapidKeys = {
   publicKey:
      'BGWpVrDGM98ws_TgYn6PL7kHuxBYbxKliUosgEbmZB_Q2QBxTisktavxKL4akTsdvAcaAVvHgUSm4ipJIQI0zDE',
   privateKey: '83PpoCAfP-4FgqQ6yV9sNKEoIyUZJuLj2I-KoFlKcWY',
};

webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
);
var pushSubscription = {
   endpoint:
      'https://fcm.googleapis.com/fcm/send/e8X1dt302aM:APA91bFZHTzRf_2_42lqu80NEOvbtk7Z0hO_9cvn2zp6qnBXgPLo_IAb9fVCprqB3hKoyGtTtvtVcbkL1h-cane6TLdDXfTvF61nSVN8syegRqxTGTV4SxgBAQiTSSi06UFB3eJdnvBf',
   keys: {
      p256dh:
         'BDUsOstWTypOId6H89+62GEVuyZDy6DeIuJVH8g5Znzrnlg7U8MDL/kjMt2RzNA9/3b0tWY4Qa+aFOYb0sublGY=',
      auth: 'o12WWsxLNFaG3sRiQkzHmA==',
   },
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '47967080645',
   TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
