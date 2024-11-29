let light2 = 0
let light1 = 0
// Góc ban đầu của servo
let servoAngle = 90
// Ngưỡng chênh lệch ánh sáng để điều chỉnh
let threshold = 5
serial.setBaudRate(BaudRate.BaudRate115200)
makerbit.connectLcd(33)
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB)) {
        threshold = 5
    } else if (input.buttonIsPressed(Button.B)) {
        threshold += 1
    } else if (input.buttonIsPressed(Button.A)) {
        threshold += -1
    }
    basic.pause(100)
})
// Ngưỡng chênh lệch ánh sáng để điều chỉnh
basic.forever(function () {
    // Đọc giá trị từ cảm biến 1
    light1 = pins.analogReadPin(AnalogPin.P0)
    // Đọc giá trị từ cảm biến 2
    light2 = pins.analogReadPin(AnalogPin.P1)
    // So sánh ánh sáng và điều chỉnh servo
    if (light1 > light2 + threshold) {
        // Quay servo sang phải
        servoAngle = Math.min(servoAngle + 0.5, 135)
    } else if (light2 > light1 + threshold) {
        // Quay servo sang trái
        servoAngle = Math.max(servoAngle - 0.5, 45)
    }
    // Điều chỉnh servo theo góc tính được
    pins.servoWritePin(AnalogPin.P16, servoAngle)
})
basic.forever(function () {
    led.plot(randint(0, 4), randint(0, 4))
    serial.writeNumbers([
    light1,
    light2,
    servoAngle
    ])
    makerbit.showStringOnLcd1602("L1:" + light1, makerbit.position1602(LcdPosition1602.Pos1), 8, TextOption.AlignLeft)
    makerbit.showStringOnLcd1602("L2:" + light2, makerbit.position1602(LcdPosition1602.Pos9), 8, TextOption.AlignLeft)
    makerbit.showStringOnLcd1602("Th:" + threshold, makerbit.position1602(LcdPosition1602.Pos17), 8, TextOption.AlignLeft)
    makerbit.showStringOnLcd1602("An:" + servoAngle, makerbit.position1602(LcdPosition1602.Pos25), 8, TextOption.AlignLeft)
    makerbit.lcdMakeCharacter(LcdChar.c1, makerbit.lcdCharacterPixels(`
        . . # . .
        . # . # .
        . . # . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `))
    makerbit.lcdShowCharacter1602(LcdChar.c1, makerbit.position1602(LcdPosition1602.Pos31))
    basic.pause(100)
    basic.clearScreen()
})
