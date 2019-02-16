const ContinousAuthChallengeHandler = function() {

    let challengeCallback;

    this.canHandle = function(challengeRequest) {
        // console.log('canHandle() authenticationScheme='+challengeRequest.authenticationScheme+', authenticationParameters=['+challengeRequest.authenticationParameters+'], location='+challengeRequest.location);
        return true;
    };

    this.handle = function(challengeRequest, callback) {
        console.log("Received challenge from Gateway");
        console.log('authenticationScheme='+challengeRequest.authenticationScheme+', authenticationParameters=['+challengeRequest.authenticationParameters+'], location='+challengeRequest.location);
        challengeCallback = callback;

        const token = {
            "username": "robin",
            "nonce": "123"
        };
        console.log(JSON.stringify(token));
        const challengeResponse = new ChallengeResponse('Token ' + JSON.stringify(token), null);
        challengeCallback(challengeResponse);
        // $loginPanel.slideDown();
        // $username.focus();
    };

    console.log("ContinousAuthChallengeHandler initialized");

};
/*
let $wsUri;
let $connectBut;
let $disconnectBut;
let $sendMessage;
let $sendBut;
let $consoleLog;
let $clearLogBut;

let $loginPanel;
let $username;
let $password;
let $loginOkBut;
let $loginCancelBut;

let $rsaPanel;
let $rsaCode;
let $rsaOkBut;
let $rsaCancelBut;

let factory;
let ws;

let twoFactorChallengeHandler;

const writeToLog = function(message) {
    $consoleLog.append($('<div>', {
        class: "logMessage"
    })
        .append(message));

    const height = $consoleLog[0].scrollHeight;
    $consoleLog.stop().animate({ scrollTop: 300 }, 1000);
};

const handleClickLoginCancelBut = function() {
    $username.val('');
    $password.val('');
    $loginPanel.hide()
    $wsUri.focus();
};

const handleClickLoginOkBut = function() {
    // let credentials = new PasswordAuthentication($username.val(), $password.val());
    // callback(credentials);
    const token = {
        "factor": 1,
        "username": $username.val(),
        "password": $password.val()
    };
    console.log(JSON.stringify(token));
    const challengeResponse = new ChallengeResponse('Token ' + JSON.stringify(token), null);
    $loginCancelBut.click();
    twoFactorChallengeHandler.callback(challengeResponse);
};

const handleClickRsaCancelBut = function() {
    $rsaCode.val('');
    $rsaPanel.hide();
    $wsUri.focus();
};

const handleClickRsaOkBut = function() {
    const token = {
        "factor": 2,
        "rsaCode": $rsaCode.val(),
        "correlationId": twoFactorChallengeHandler.correlationId
    };
    console.log('Sending: '+JSON.stringify(token));
    const challengeResponse = new ChallengeResponse('Token ' + JSON.stringify(token), null);
    $rsaCancelBut.click();
    twoFactorChallengeHandler.callback(challengeResponse);
};

const TwoFactorChallengeHandler = function() {

    this.correlationId = '';

    this.canHandle = function(challengeRequest) {
        console.log('canHandle() authenticationScheme='+challengeRequest.authenticationScheme+', authenticationParameters=['+challengeRequest.authenticationParameters+'], location='+challengeRequest.location);
        return true;
    };

    this.handle = function(challengeRequest, callback) {
        console.log('handle()    authenticationScheme='+challengeRequest.authenticationScheme+', authenticationParameters=['+challengeRequest.authenticationParameters+'], location='+challengeRequest.location);
        // console.log("Received challenge from Gateway");
        this.callback = callback;

        c = challengeRequest.authenticationParameters; // TODO: Delete
        let factor = '1';
        if (challengeRequest.authenticationParameters !== null) {
            // The authentication parameters have a carriage return on the end which needs to be stripped.
            // The authentication parameters are space separated.
            const authParams = challengeRequest.authenticationParameters.slice(0, -1).split(' ');
            d = authParams; // TODO: Delete
            for (i in authParams) {
                console.log('  Trying '+authParams[i]);
                const params = authParams[i].split('=');
                const name = params[0];
                const value = params[1].replace(/"/g,'');
                console.log('  params=['+params+'], name=['+name+'], value=['+value+']');
                switch (name) {
                    case 'factor':
                        factor = value;
                        break;
                    case 'correlation':
                        twoFactorChallengeHandler.correlationId = value;
                        break;
                }
            }
            console.log('factor=['+factor+'], correlationId=['+twoFactorChallengeHandler.correlationId+']');
        }
        switch (factor) {
            case '1':
                $loginPanel.slideDown();
                $username.focus();
                break;
            case '2':
                console.log('corelationId='+twoFactorChallengeHandler.correlationId);
                $rsaPanel.slideDown();
                $rsaCode.focus();
                break;
        }

    };

    console.log("TwoFactorChallengeHandler initialized");

};

const setGuiConnected = function(isConnected)
{
    $wsUri.prop('disabled', isConnected);
    $connectBut.prop('disabled', isConnected);
    $disconnectBut.prop('disabled', !isConnected);
    $sendMessage.prop('disabled', !isConnected);
    $sendBut.prop('disabled', !isConnected);
}

const onOpen = function(evt) {
    writeToLog('Connected');
    setGuiConnected(true);
    $sendMessage.focus();
};

const onClose = function(evt) {
    writeToLog('Disconnected');
    setGuiConnected(false);
    $wsUri.focus();
};

const onMessage = function(evt) {
    writeToLog('<span class="received">RECEIVED: '+evt.data+'</span>');
};

const onError = function(evt) {
    writeToLog('onError()');
};

const setupSSO = function(factory) {

    twoFactorChallengeHandler = new TwoFactorChallengeHandler();
    factory.setChallengeHandler(twoFactorChallengeHandler);

    // Respond to authentication challenges with popup login dialog
    // let basicHandler = new BasicChallengeHandler();
    // basicHandler.loginHandler = function(callback) {
    //     showLoginPanel(callback);
    // }
    // factory.setChallengeHandler(basicHandler);
}

const doConnect = function() {
    factory = new WebSocketFactory();
    setupSSO(factory);
    ws = factory.createWebSocket($wsUri.val());
    // ws = new WebSocket($wsUri.val());
    ws.onopen = function(evt) { onOpen(evt) };
    ws.onclose = function(evt) { onClose(evt) };
    ws.onmessage = function(evt) { onMessage(evt) };
    ws.onerror = function(evt) { onError(evt) };
};

const doDisconnect = function()
{
    ws.close();
};

const doSend = function()
{
    writeToLog('SENT: ' + $sendMessage.val());
    ws.send($sendMessage.val());
};

*/

$(document).ready(function() {
    console.log('Ready');
    return;
    $wsUri = $('#wsUri');
    $connectBut = $('#connectBut');
    $disconnectBut = $('#disconnectBut');
    $sendMessage = $('#sendMessage');
    $sendBut = $('#sendBut');
    $consoleLog = $('#consoleLog');
    $clearLogBut = $('#clearLogBut');

    $connectBut.click(doConnect);
    // Connect if the user presses enter in the connect field.
    $wsUri.keypress(function( event ) {
        if ( event.which == 13 ) {
            $connectBut.click();
        }
    });

    $disconnectBut.click(doDisconnect);

    $sendBut.click(doSend);
    // Send message if the user presses enter in the the sendMessage field.
    $sendMessage.keypress(function( event ) {
        if ( event.which == 13 ) {
            $sendBut.click();
        }
    });

    $clearLogBut.click(function() {
        $consoleLog.empty();
    });

    $loginPanel = $('#login-panel');
    $loginPanel.keypress(function( event ) {
        if ( event.which == 13 ) {
            $loginOkBut.click();
        }
    });

    $username = $('#username');

    $password = $('#password');

    $loginOkBut = $('#loginOkBut');
    $loginOkBut.click(function() {
        handleClickLoginOkBut();
    });

    $loginCancelBut = $('#loginCancelBut');
    $loginCancelBut.click(function() {
        handleClickLoginCancelBut();
    });

    $rsaPanel = $('#rsa-panel');
    $rsaPanel.keypress(function( event ) {
        if ( event.which == 13 ) {
            $rsaOkBut.click();
        }
    });

    $rsaCode = $('#rsa-code');

    $rsaOkBut = $('#rsaOkBut');
    $rsaOkBut.click(function() {
        handleClickRsaOkBut();
    });

    $rsaCancelBut = $('#rsaCancelBut');
    $rsaCancelBut.click(function() {
        handleClickRsaCancelBut();
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 27) { // esc
            if ($loginPanel.is(':visible')) {
                $loginCancelBut.click();
            } else if ($rsaPanel.is(':visible')) {
                $rsaCancelBut.click();
            }
        }
    });

    setGuiConnected(false);
    $wsUri.focus();
});