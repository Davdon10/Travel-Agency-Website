exports = (function () {

    var allGreetings = {

        greetingCollection: [
            'Hello',
            'Bienvenido!',
            'Welcome',
            'Greetings',
            'Shalom',
            'Nice to see you again ...',
            'Hihi',
            'Dudester!',
            'Hola',
            'Guten Targ',
            'You bring a smile to our eyes!',
            'Oh hi there',
            'Howdy',
            'Bonjour',
            'It is a beautiful day!',
            'Good day to you!',
            'A Hoy Hoy!'
        ],

        ourGreet: function () {

            var idx = Math.floor(Math.random() * this.greetingCollection.length);

            return this.greetingCollection[idx];

        }
    }

    return allGreetings;

})();