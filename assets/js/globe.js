/* =========================================================
   English Effect — Interactive globe (home page hero)
   Dhaka theke flight arc gula ure jay. Mouse/finger diye ghorano jay.
   Destination bodlate ba add korte DESTS list e edit koro.
   ========================================================= */
(function () {
  var host = document.getElementById("globe");
  if (!host) return;

  var DHAKA = { code: "DAC", city: "Dhaka", lat: 23.84, lon: 90.40 };
  var DESTS = [
    { code: "LHR", city: "London", lat: 51.47, lon: -0.45 },
    { code: "SYD", city: "Sydney", lat: -33.94, lon: 151.18 },
    { code: "YYZ", city: "Toronto", lat: 43.68, lon: -79.63 },
    { code: "DUB", city: "Dublin", lat: 53.42, lon: -6.27 },
    { code: "MEL", city: "Melbourne", lat: -37.67, lon: 144.84 },
    { code: "AKL", city: "Auckland", lat: -37.01, lon: 174.79 }
  ];
  var C = { dot: "141,198,63", rim: "141,198,63", arc: "255,212,59", sea1: "#173f4b", sea2: "#0b2028", white: "255,255,255" };

  /* land dots: base64 Int16 pairs (lat*10, lon*10), Natural Earth 110m via world-atlas */
  var RAW = "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QgB1/UIAhv1CAJf9QgCo/UIAuf1CAJn/QgCq/0IAu/9CAM3/QgDe/0IA7/9CAAAAQgARAEIAIgBCADMAQgBFAEIAVgBCAGcAQgB4AEIAiQBCAJoAQgCrAEIAvQBCAM4AQgDfAEIA8ABCAAEBQgASAUIAIwFCADUBQgBGAUIAVwFCAGgBQgB5AUIAigFCAJsBQgCtAUIAvgFCAM8BQgDgAUIAJgNCAPMDQgCOBEIA4wRTAMn8UwDa/FMA/fxTAA79UwAf/VMAMP1TAEH9UwBS/VMAY/1TAHX9UwCG/VMAl/1TAKj9UwCI/1MAmf9TAKr/UwC7/1MAzf9TAN7/UwDv/1MAAABTABEAUwAiAFMAMwBTAEUAUwBWAFMAZwBTAHgAUwCJAFMAmgBTAKsAUwC9AFMAzgBTAN8AUwDwAFMAAQFTABIBUwAjAVMANQFTAEYBUwBXAVMAaAFTAHkBUwCKAVMAmwFTAK0BUwC+AVMAzwFTAOABUwDxAVMAJgNTAOIDUwDSBFMA4wRkAKv8ZAC9/GQAE/1kACT9ZABG/WQAWP1kAGn9ZAB6/WQAi/1kAH//ZACQ/2QAof9kALL/ZADE/2QA1f9kAOb/ZAD3/2QACQBkABoAZAArAGQAPABkAE4AZABfAGQAcABkAIEAZACSAGQApABkALUAZADGAGQA1wBkAOkAZAD6AGQACwFkABwBZAAtAWQAPwFkAFABZABhAWQAcgFkAIQBZACVAWQApgFkALcBZADIAWQA2gFkAOsBZAD/AmQAEANkAN4DZAAjBGQA0AR1AKP8dQC1/HUALv11AGz/dQB+/3UAj/91AKD/dQCy/3UAw/91ANX/dQDm/3UA9/91AAkAdQAaAHUAKwB1AD0AdQBOAHUAYAB1AHEAdQCCAHUAlAB1AKUAdQC3AHUAyAB1ANkAdQDrAHUA/AB1AA4BdQAfAXUAMAF1AEIBdQBTAXUAZQF1AHYBdQCHAXUAmQF1AKoBdQD1AnUABgN1ABcDdQALBHUAHAR1AC4EdQA/BIYAhfyGAJb8hgCo/IYAufyGAGP/hgB0/4YAhv+GAJf/hgCp/4YAuv+GAMz/hgDd/4YA7/+GAAAAhgARAIYAIwCGADQAhgBGAIYAVwCGAGkAhgB6AIYAjACGAJ0AhgCvAIYAwACGANIAhgDjAIYA9QCGAAYBhgAYAYYAKQGGADsBhgBMAYYAXgGGAG8BhgCAAYYAkgGGAKMBhgC1AYYAxgGGAO8ChgABA4YAEgOGAOQDhgD2A4YABwSGABkEhgAqBIYAOwSGALYElwBq/JcAfPyXAI78lwCf/JcAsfyXAGH/lwBz/5cAhP+XAJb/lwCo/5cAuf+XAMv/lwDd/5cA7v+XAAAAlwASAJcAIwCXADUAlwBHAJcAWACXAGoAlwB8AJcAjQCXAJ8AlwCwAJcAwgCXANQAlwDlAJcA9wCXAAkBlwAaAZcALAGXAD4BlwBPAZcAYQGXAHMBlwCEAZcAuQGXAMsBlwDcAZcA7gGXAPcClwAIA5cAGgOXANwDlwDuA5cAAASXABEElwAjBJcANASoACj8qAA5/KgAS/yoAF38qABv/KgAgPyoAGn/qAB7/6gAjf+oAJ7/qACw/6gAwv+oANT/qADl/6gA9/+oAAkAqAAbAKgALACoAD4AqABQAKgAYgCoAHMAqACFAKgAlwCoAKgAqAC6AKgAzACoAN4AqADvAKgAAQGoABMBqAAlAagANgGoAEgBqABaAagAbAGoAH0BqACyAagAxAGoANYBqADoAagA+QGoAAsCqADgAqgA8gKoAAMDqAAVA6gAJwOoALUDqADHA6gA2AOoAOoDqAD8A6gADQSoAB8EqAC/BLkA+vu5AAz8uQAe/LkAMPy5AEL8uQBm/LkAePy5AIn8uQD1/LkAGf25ACv9uQA9/bkATv25AGj/uQB6/7kAjP+5AJ3/uQCv/7kAwf+5ANP/uQDl/7kA9/+5AAkAuQAbALkALQC5AD8AuQBRALkAYwC5AHQAuQCGALkAmAC5AKoAuQC8ALkAzgC5AOAAuQDyALkABAG5ABYBuQAoAbkAOQG5AEsBuQBdAbkAbwG5AKUBuQC3AbkAyQG5ANsBuQDtAbkA/gG5ABACuQAiArkANAK5AOcCuQD5ArkACwO5AB0DuQAvA7kAQQO5AL4DuQDQA7kA4gO5APQDuQAGBLkAGAS5ALkEygDw+8oAAvzKABT8ygAm/MoAgfzKAJP8ygD//MoAEf3KAGb/ygB4/8oAiv/KAJ3/ygCv/8oAwf/KANP/ygDl/8oA9//KAAkAygAbAMoALQDKAD8AygBRAMoAYwDKAHYAygCIAMoAmgDKAKwAygC+AMoA0ADKAOIAygD0AMoABgHKABgBygAqAcoAPQHKAE8BygBhAcoAlwHKAKkBygC7AcoAzQHKAN8BygDxAcoABALKABYCygAoAsoAOgLKAN0CygDvAsoAAQPKABMDygAlA8oANwPKAEkDygBbA8oApAPKALYDygDIA8oA2gPKAOwDygD+A8oAEATKACIE2wDp+9sA+/vbAA782wAg/NsAs/zbAOr82wBb/9sAbf/bAH//2wCS/9sApP/bALf/2wDJ/9sA2//bAO7/2wAAANsAEgDbACUA2wA3ANsASQDbAFwA2wBuANsAgQDbAJMA2wClANsAuADbAMoA2wDcANsA7wDbAAEB2wAUAdsAJgHbADgB2wBLAdsAXQHbAG8B2wCUAdsApgHbALkB2wDLAdsA3gHbAPAB2wACAtsAFQLbACcC2wA5AtsATALbALoC2wDMAtsA3wLbAPEC2wADA9sAFgPbACgD2wA7A9sATQPbAF8D2wByA9sAqQPbALsD2wDNA9sA4APbAPID2wAFBNsAFwTbACkE2wA8BNsATgTbAGAE7ADe++wA8fvsAAP87AAW/OwAKPzsAGz/7AB+/+wAkf/sAKP/7AC2/+wAyP/sANv/7ADt/+wAAADsABMA7AAlAOwAOADsAEoA7ABdAOwAbwDsAIIA7ACUAOwApwDsALoA7ADMAOwA3wDsAPEA7AAEAewAFgHsACkB7AA7AewATgHsAGEB7ACGAewAmAHsAKsB7AC9AewA0AHsAOIB7AD1AewACALsABoC7AAtAuwAPwLsAK8C7ADBAuwA1ALsAOYC7AD5AuwACwPsAB4D7AAwA+wAQwPsAFYD7ABoA+wAewPsAI0D7ACgA+wAsgPsAMUD7ADYA+wA6gPsAP0D7AAPBOwAIgTsADQE7ABHBOwAWQTsAGwE7AB/BOwAkQTsALYE/QCf+/0AxPv9ANf7/QDq+/0A/fv9ABD8/QAi/P0Ac//9AIX//QCY//0Aq//9AL7//QDR//0A5P/9APf//QAJAP0AHAD9AC8A/QBCAP0AVQD9AGgA/QB7AP0AjQD9AKAA/QCzAP0AxgD9ANkA/QDsAP0A/gD9ABEB/QAkAf0ANwH9AEoB/QCCAf0AlQH9AKgB/QC7Af0AzgH9AOEB/QDzAf0ALAL9AGUC/QB3Av0AigL9AJ0C/QCwAv0AwwL9ANYC/QDpAv0A+wL9AA4D/QAhA/0ANAP9AEcD/QBaA/0AbAP9AH8D/QCSA/0ApQP9ALgD/QDLA/0A3gP9APAD/QADBP0AFgT9ACkE/QA8BP0ATwT9AGEE/QB0BP0AhwT9AJoEDgGT+w4BufsOAcz7DgHf+w4B8vsOAQX8DgEY/A4BK/wOAdb8DgGE/w4Bl/8OAar/DgG9/w4B0P8OAeP/DgH2/w4BCgAOAR0ADgEwAA4BQwAOAVYADgFpAA4BfAAOAY8ADgGiAA4BtQAOAcgADgHbAA4B7gAOAQEBDgEUAQ4BJwEOAToBDgFNAQ4BcwEOAYYBDgGaAQ4BrQEOAcABDgHTAQ4B5gEOAR8CDgFFAg4BWAIOAWsCDgF+Ag4BkQIOAaQCDgG3Ag4BygIOAd0CDgHwAg4BAwMOARYDDgEqAw4BPQMOAVADDgFjAw4BdgMOAYkDDgGcAw4BrwMOAcIDDgHVAw4B6AMOAfsDDgEOBA4BIQQOATQEDgFHBA4BWgQOAW0EDgGABA4BkwQOAaYEHwGK+x8BsfsfAcT7HwHX+x8B6/sfAf77HwES/B8BJfwfATj8HwHT/B8Bn/8fAbP/HwHG/x8B2f8fAe3/HwEAAB8BEwAfAScAHwE6AB8BTQAfAWEAHwF0AB8BhwAfAZsAHwGuAB8BwgAfAdUAHwHoAB8B/AAfAQ8BHwEiAR8BNgEfAVwBHwFwAR8BgwEfAZYBHwGqAR8BvQEfAdEBHwELAh8BHgIfATECHwFFAh8BWAIfAWsCHwF/Ah8BkgIfAaUCHwG5Ah8BzAIfAd8CHwHzAh8BBgMfARoDHwEtAx8BQAMfAVQDHwFnAx8BegMfAY4DHwGhAx8BtAMfAcgDHwHbAx8B7gMfAQIEHwEVBB8BKQQfATwEHwFPBB8BYwQfAXYEHwGJBB8BnQQfAbAEMAGB+zABqfswAbz7MAHQ+zAB5PswAff7MAEL/DABH/wwATL8MAFG/DABWvwwAW38MAGB/DABlfwwAaj8MAG8/DAB0PwwAaf/MAG7/zABz/8wAeL/MAH2/zABCgAwAR4AMAExADABRQAwAVkAMAFsADABgAAwAZQAMAGnADABuwAwAc8AMAHiADAB9gAwAQoBMAEdATABMQEwAUUBMAFYATABbAEwAYABMAGTATABpwEwAbsBMAHOATAB4gEwAfYBMAEJAjABHQIwATECMAFEAjABWAIwAWwCMAF/AjABkwIwAacCMAG6AjABzgIwAeICMAH1AjABCQMwAR0DMAEwAzABRAMwAVgDMAFrAzABfwMwAZMDMAGmAzABugMwAc4DMAHhAzAB9QMwAQkEMAEcBDABMAQwAUQEMAFXBDABawQwAX8EMAGSBDABpgQwAboEQQF8+0EBkPtBAaT7QQG4+0EBzPtBAeD7QQH0+0EBCPxBARz8QQEx/EEBRfxBAVn8QQFt/EEBgfxBAZX8QQGp/EEBvfxBAdH8QQGl/0EBuv9BAc7/QQHi/0EB9v9BAQoAQQEeAEEBMgBBAUYAQQFbAEEBbwBBAYMAQQGXAEEB0wBBAecAQQFgAUEBdAFBAYgBQQGcAUEBsAFBAcUBQQHZAUEB7QFBAQECQQEVAkEBKQJBAT0CQQFRAkEBZQJBAXoCQQGOAkEBogJBAbYCQQHKAkEB3gJBAfICQQEGA0EBGgNBAS8DQQFDA0EBVwNBAWsDQQF/A0EBkwNBAacDQQG7A0EBzwNBAeQDQQH4A0EBDARBASAEQQE0BEEBSARBAVwEQQFwBEEBhARBAZkEQQGtBFIBcvtSAYf7UgGb+1IBr/tSAcT7UgHY+1IB7ftSAQH8UgEW/FIBKvxSAT/8UgFT/FIBaPxSAXz8UgGQ/FIBpfxSAbn8UgHO/FIB4vxSAcP/UgHX/1IB7P9SAQAAUgEUAFIBKQBSAT0AUgFSAFIBZgBSAXABUgGFAVIBmQFSAa4BUgHCAVIB1gFSAesBUgH/AVIBFAJSASgCUgE9AlIBUQJSAWYCUgF6AlIBjwJSAaMCUgG3AlIBzAJSAeACUgH1AlIBCQNSAR4DUgEyA1IBRwNSAVsDUgFwA1IBhANSAZgDUgGtA1IBwQNSAdYDUgHqA1IB/wNSARMEUgEoBFIBPARSAVEEUgFlBFIBeQRSAY4EUgGiBFIBHQVSATIFYwFX+2MBbPtjAYH7YwGW+2MBq/tjAcD7YwHV+2MB6ftjAf77YwET/GMBKPxjAT38YwFS/GMBZ/xjAXz8YwGR/GMBpvxjAbv8YwHQ/GMB5fxjAfr8YwEAAGMBFQBjASoAYwE/AGMBVABjAWkAYwF5AWMBjgFjAaMBYwG4AWMBzAFjAeEBYwH2AWMBCwJjASACYwE1AmMBSgJjAV8CYwF0AmMBiQJjAZ4CYwGzAmMByAJjAd0CYwHxAmMBBgNjARsDYwEwA2MBRQNjAVoDYwFvA2MBhANjAZkDYwGuA2MBwwNjAdgDYwHtA2MBAgRjARcEYwErBGMBQARjAVUEYwFqBGMBfwRjAZQEYwGpBGMB/QRjATwFYwFQBWMBZQVjAXoFdAFM+3QBYvt0AXf7dAGM+3QBovt0Abf7dAHM+3QB4vt0Aff7dAEM/HQBIfx0ATf8dAFM/HQBYfx0AXf8dAGM/HQBofx0Abf8dAHM/HQB4fx0Afb8dAG1/3QBy/90AeD/dAFgAHQBigB0AeAAdAEgAXQBNQF0AUoBdAFfAXQBdQF0AYoBdAGfAXQBtQF0AcoBdAHfAXQB9QF0AR8CdAE0AnQBSgJ0AV8CdAF0AnQBigJ0AZ8CdAG0AnQBygJ0Ad8CdAH0AnQBCgN0AR8DdAE0A3QBSQN0AV8DdAF0A3QBiQN0AZ8DdAG0A3QByQN0Ad8DdAH0A3QBCQR0AR4EdAE0BHQBSQR0AV4EdAF0BHQBiQR0AZ4EdAG0BHQB8wR0AQkFdAFzBYUBL/uFAUX7hQFb+4UBcfuFAYf7hQGc+4UBsvuFAcj7hQHe+4UB9PuFAQn8hQEf/IUBNfyFAUv8hQFh/IUBd/yFAYz8hQGi/IUBuPyFAc78hQHk/IUB+fyFAQ/9hQG0/4UByf+FAd//hQH1/4UBpACFAc8AhQHlAIUBEQGFAScBhQE8AYUBUgGFAWgBhQF+AYUBlAGFAakBhQG/AYUB1QGFASwChQFCAoUBWAKFAW4ChQGEAoUBmQKFAa8ChQHFAoUB2wKFAfEChQEHA4UBHAOFATIDhQFIA4UBXgOFAXQDhQGJA4UBnwOFAbUDhQHLA4UB4QOFAfcDhQEMBIUBIgSFATgEhQFOBIUBZASFAXkEhQGPBIUB5wSFAfwEhQF/BZYBJ/uWAT37lgFU+5YBavuWAYD7lgGX+5YBrfuWAcT7lgHa+5YB8PuWAQf8lgEd/JYBM/yWAUr8lgFg/JYBdvyWAY38lgGj/JYBufyWAdD8lgHm/JYB/fyWARP9lgGy/5YByP+WAd7/lgH1/5YBqACWAdQAlgHrAJYBLgGWAUQBlgFbAZYBcQGWAYcBlgGeAZYBtAGWAcoBlgHhAZYBJAKWAToClgFRApYBZwKWAX0ClgGUApYBqgKWAcAClgHXApYB7QKWAQMDlgEaA5YBMAOWAUcDlgFdA5YBcwOWAYoDlgGgA5YBtgOWAc0DlgHjA5YB+QOWARAElgEmBJYBPASWAVMElgFpBJYBgASWAZYElgGsBJYB2QSWAe8ElgEGBacBNfunAUz7pwFj+6cBevunAZH7pwGo+6cBv/unAdb7pwHt+6cBBPynARv8pwEx/KcBSPynAV/8pwF2/KcBjfynAaT8pwG7/KcB0vynAen8pwEA/acBF/2nAS79pwGw/6cBx/+nAd7/pwH1/6cBCwCnAX4ApwHDAKcB2gCnAfEApwEIAacBqAGnAb8BpwHWAacBGwKnATICpwFJAqcBYAKnAXcCpwGOAqcBpAKnAbsCpwHSAqcB6QKnAQADpwEXA6cBLgOnAUUDpwFcA6cBcwOnAYoDpwGhA6cBuAOnAc8DpwHlA6cB/AOnARMEpwEqBKcBQQSnAVgEpwFvBKcBhgSnAZ0EpwG0BKcBywSnAeIEpwH5BKcBEAWnAYIFpwGZBbgBMPu4AUj7uAFg+7gBd/u4AY/7uAGn+7gBv/u4Adb7uAHu+7gBBvy4AR38uAE1/LgBTfy4AWT8uAF8/LgBlPy4Aav8uAHD/LgB2/y4AfL8uAEK/bgBIv24ATn9uAEAALgBGAC4AS8AuAFHALgBdgC4AaYAuAG9ALgB1QC4Ae0AuAEFAbgBHAG4AZMBuAGqAbgBwgG4AQkCuAEhArgBOAK4AVACuAFoArgBfwK4AZcCuAGvArgBxwK4Ad4CuAH2ArgBDgO4ASUDuAE9A7gBVQO4AWwDuAGEA7gBnAO4AbMDuAHLA7gB4wO4AfoDuAESBLgBKgS4AUEEuAFZBLgBcQS4AYkEuAGgBLgBuAS4AdAEuAHnBLgB/wS4ARcFuAEuBbgBRgW4AY0FuAGlBckBQPvJAVj7yQFw+8kBifvJAaH7yQG5+8kB0vvJAer7yQEC/MkBG/zJATP8yQFL/MkBZPzJAXz8yQGU/MkBrfzJAcX8yQHd/MkB9vzJAQ79yQEm/ckBP/3JAVf9yQFv/ckBiP3JAaD9yQEAAMkBGADJATEAyQFJAMkBYQDJAXoAyQGSAMkBqgDJAcMAyQHbAMkB8wDJAQwByQEkAckBVQHJAYUByQGeAckBtgHJAc4ByQEXAskBLwLJAUgCyQFgAskBeALJAZECyQGpAskBwQLJAdoCyQHyAskBCgPJASMDyQE7A8kBUwPJAWwDyQGEA8kBnAPJAbUDyQHNA8kB5QPJAf4DyQEWBMkBLgTJAUcEyQFfBMkBdwTJAZAEyQGoBMkBwATJAdkEyQHxBMkBCQXJASIFyQE6BckBUgXaATv72gFU+9oBbfvaAYf72gGg+9oBufvaAdL72gHr+9oBBPzaAR782gE3/NoBUPzaAWn82gGC/NoBm/zaAbX82gHO/NoB5/zaAQD92gEZ/doBM/3aAUz92gFl/doB8//aAQ0A2gEmANoBPwDaAVgA2gFxANoBigDaAaQA2gG9ANoB1gDaAe8A2gEIAdoBIgHaATsB2gFUAdoBbQHaAYYB2gGfAdoBuQHaAdIB2gHrAdoBBALaAR0C2gE2AtoBUALaAWkC2gGCAtoBmwLaAbQC2gHNAtoB5wLaAQAD2gEZA9oBMgPaAUsD2gFlA9oBfgPaAZcD2gGwA9oByQPaAeID2gH8A9oBFQTaAS4E2gFHBNoBYATaAXkE2gGTBNoBrATaAcUE2gHeBNoB9wTaAREF2gEqBdoBQwXaAVwF2gGOBesBGPvrATL76wFM++sBZvvrAX/76wGZ++sBs/vrAc376wHn++sBAfzrARv86wE1/OsBT/zrAWn86wGC/OsBnPzrAbb86wHQ/OsB6vzrAQT96wEe/esBOP3rAVL96wFs/esBuf3rAdP96wHz/+sBDQDrAScA6wFBAOsBWwDrAXUA6wGOAOsBqADrAcIA6wHcAOsB9gDrARAB6wEqAesBRAHrAV4B6wF4AesBkQHrAasB6wHFAesB3wHrAfkB6wETAusBLQLrAUcC6wFhAusBewLrAZQC6wGuAusByALrAeIC6wH8AusBFgPrATAD6wFKA+sBZAPrAX4D6wGXA+sBsQPrAcsD6wHlA+sB/wPrARkE6wEzBOsBTQTrAWcE6wGBBOsBmgTrAbQE6wHOBOsB6ATrAQIF6wEcBesBNgXrAVAF6wFqBfwBEfv8ASz7/AFH+/wBYvv8AX37/AGY+/wBs/v8Ac37/AHo+/wBA/z8AR78/AE5/PwBVPz8AW/8/AGJ/PwBpPz8Ab/8/AHa/PwB9fz8ARD9/AEr/fwBRf38AWD9/AF7/fwBlv38Acz9/AHl//wBAAD8ARsA/AE2APwBUQD8AWsA/AGGAPwBoQD8AbwA/AHXAPwB8gD8AQ0B/AEoAfwBQgH8AV0B/AF4AfwBkwH8Aa4B/AHJAfwB5AH8Af4B/AEZAvwBNAL8AU8C/AFqAvwBhQL8AaAC/AG7AvwB1QL8AfAC/AELA/wBJgP8AUED/AFcA/wBdwP8AZED/AGsA/wBxwP8AeID/AH9A/wBGAT8ATME/AFNBPwBaAT8AYME/AGeBPwBuQT8AdQE/AHvBPwBCgX8ASQF/AE/BfwBWgX8AXUF/AGQBQ0CCvsNAib7DQJC+w0CXvsNAnr7DQKW+w0CsvsNAs77DQLp+w0CBfwNAiH8DQI9/A0CWfwNAnX8DQKR/A0CrfwNAsn8DQIB/Q0CHP0NAjj9DQJU/Q0CcP0NAoz9DQKo/Q0CxP0NArr/DQLW/w0C8v8NAg4ADQJGAA0CYgANAn4ADQKZAA0CtQANAtEADQLtAA0CCQENAiUBDQJBAQ0CXQENAnkBDQKVAQ0CsQENAswBDQLoAQ0CBAINAiACDQI8Ag0CWAINAnQCDQKQAg0CrAINAsgCDQLkAg0C/wINAhsDDQI3Aw0CUwMNAm8DDQKLAw0CpwMNAsMDDQLfAw0C+wMNAhcEDQIyBA0CTgQNAmoEDQKGBA0CogQNAr4EDQLaBA0C9gQNAhIFDQIuBQ0CSQUNAmUFDQKBBQ0CKQYeAgP7HgIg+x4CPfseAlr7HgJ3+x4ClPseArH7HgLO+x4C6/seAgj8HgIl/B4CQvweAl/8HgJ8/B4CmfweArb8HgLw/B4CDf0eAir9HgJH/R4CZP0eAoH9HgKe/R4Cu/0eAqn/HgLj/x4CVwAeAq4AHgLLAB4C6AAeAgUBHgIiAR4CPwEeAlwBHgJ5AR4ClgEeArMBHgLRAR4C7gEeAgsCHgIoAh4CRQIeAmICHgJ/Ah4CnAIeArkCHgLWAh4C8wIeAhADHgItAx4CSgMeAmcDHgKEAx4CoQMeAr4DHgLbAx4C+AMeAhUEHgIyBB4CTwQeAmwEHgKJBB4CpgQeAsMEHgLgBB4C/QQeAhoFHgI3BR4CVQUeAnIFHgKPBR4CIAYeAj0GLwLM+S8C3PovAvr6LwIZ+y8CN/svAlX7LwJz+y8CkvsvArD7LwLO+y8C7PsvAgv8LwIp/C8CR/wvAmX8LwKE/C8CG/0vAjn9LwJX/S8Cdv0vApT9LwLT/y8CiAAvAuMALwIBAS8CHwEvAj4BLwJcAS8CegEvApgBLwK3AS8C1QEvAvMBLwIRAi8CMAIvAk4CLwJsAi8CigIvAqkCLwLHAi8C5QIvAgMDLwIiAy8CQAMvAl4DLwJ8Ay8CmwMvArkDLwLXAy8C9QMvAhQELwIyBC8CUAQvAm4ELwKNBC8CqwQvAskELwLnBC8CBgUvAiQFLwJCBS8CFgYvAjQGLwJSBkAC1/lAAtb6QAL2+kACFvtAAjX7QAJV+0ACdftAApX7QAK1+0AC1ftAAvX7QAIU/EACNPxAAlT8QAIT/UACM/1AAlP9QAJz/UACk/1AAtD/QAKPAEACDwFAAi8BQAJPAUACbgFAAo4BQAKuAUACzgFAAu4BQAIOAkACLgJAAk0CQAJtAkACjQJAAq0CQALNAkAC7QJAAg0DQAIsA0ACTANAAmwDQAKMA0ACrANAAswDQALsA0ACCwRAAisEQAJLBEACawRAAosEQAKrBEACywRAAuoEQAIKBUACKgVAAkoFQAJqBUACKQZAAkkGUQLA+VEC4flRAqn6UQLL+lEC7PpRAg37UQIv+1ECUPtRAnH7UQKT+1ECtPtRAtX7UQL3+1ECGPxRAjn8UQIB/VECI/1RAkT9UQJDAFECZABRAoUAUQKnAFECCwFRAiwBUQJNAVECbwFRApABUQKxAVEC0wFRAvQBUQIVAlECNwJRAlgCUQJ5AlECmwJRArwCUQLdAlEC/wJRAiADUQJBA1ECYwNRAoQDUQKlA1ECxwNRAugDUQIJBFECKwRRAkwEUQJtBFECjwRRArAEUQLRBFEC8wRRAhQFUQI1BVECVwVRAngFUQKZBVECuwVRAv0FYgKn+WICyvliAu35YgIQ+mICM/piAlb6YgJ4+mICm/piAr76YgLh+mICBPtiAif7YgJK+2ICbftiApD7YgKz+2IC1vtiAvn7YgIc/GICP/xiAhH9YgIz/WICKP5iAkv+YgI0AGICVwBiAnoAYgKdAGIC4wBiAgYBYgIpAWICTAFiAm8BYgKSAWICtQFiAtgBYgL7AWICHgJiAkECYgJkAmIChwJiAqoCYgLNAmIC7wJiAhIDYgI1A2ICWANiAnsDYgKeA2ICwQNiAuQDYgIHBGICKgRiAk0EYgJwBGICkwRiArYEYgLZBGIC/ARiAh8FYgJCBWICZQViAogFYgKqBWICzQViAvAFYgITBmICfAZiAp8GcwKy+XMC1/lzAvz5cwIh+nMCRvpzAmv6cwKQ+nMCtfpzAtr6cwIA+3MCJftzAkr7cwJv+3MClPtzArn7cwLe+3MCA/xzAij8cwJO/HMCvfxzAlH9cwIL/nMCMP5zAl0AcwKCAHMCpwBzAvEAcwIWAXMCOwFzAmEBcwKGAXMCqwFzAtABcwL1AXMCGgJzAj8CcwJkAnMCiQJzAq8CcwLUAnMC+QJzAh4DcwJDA3MCaANzAo0DcwKyA3MC2ANzAv0DcwIiBHMCRwRzAmwEcwKRBHMCtgRzAtsEcwIABXMCJgVzAksFcwJwBXMClQVzAroFcwLfBXMCBAZzAikGcwJOBnMCdAZzApkGcwK+BnMC4waEArz5hALj+YQCCvqEAjH6hAJY+oQCf/qEAqb6hALO+oQC9fqEAhz7hAJD+4QCavuEApH7hAK4+4QC3/uEAgf8hAIu/IQCVfyEAnz8hAKj/IQCyvyEAkD9hAJn/YQCA/6EAir+hAJS/oQCPP+EAmP/hAJ1AIQCnQCEAsQAhAISAYQCOQGEAocBhAKuAYQC1gGEAv0BhAIkAoQCSwKEAnIChAKZAoQCwAKEAucChAIPA4QCNgOEAl0DhAKEA4QCqwOEAtIDhAL5A4QCIQSEAkgEhAJvBIQClgSEAr0EhALkBIQCCwWEAjIFhAJaBYQCgQWEAqgFhALPBYQC9gWEAh0GhAJEBoQCawaEApMGhAK6BoQC4QaVAvj4lQIi+ZUCTPmVAsn5lQLz+ZUCHfqVAkf6lQJx+pUCm/qVAsT6lQLu+pUCGPuVAkL7lQJs+5UClvuVAsD7lQLp+5UCE/yVAj38lQJn/JUCkfyVAjj9lQKM/ZUCCv6VAjT+lQJd/pUCh/6VAln/lQKnAJUC0QCVAvsAlQIlAZUCTwGVAqMBlQLMAZUC9gGVAiAClQJKApUCdAKVAp4ClQLIApUC8QKVAhsDlQJFA5UCbwOVApkDlQLDA5UC7QOVAhcElQJABJUCagSVApQElQK+BJUC6ASVAhIFlQI8BZUCZQWVAo8FlQK5BZUC4wWVAg0GlQI3BpUCYQaVAooGlQK0BpUC3gamAvj4pgKs+aYC2fmmAgb6pgIz+qYCYPqmAo36pgK6+qYC5/qmAhT7pgJB+6YCbvumAvX7pgJP/KYCfPymAqn8pgID/aYCMP2mAl39pgIR/qYCPv6mAmv+pgKY/qYCtACmAuEApgIOAaYCOwGmAmgBpgKVAaYCwgGmAu8BpgIcAqYCSQKmAnYCpgKjAqYC0AKmAv0CpgIqA6YCVwOmAoQDpgKxA6YC3gOmAgsEpgI4BKYCZQSmApIEpgK/BKYC7ASmAhkFpgJGBaYCcwWmAqAFpgLNBaYC+gWmAicGpgJUBqYCgQamAq4GpgLbBrcCu/m3Auv5twIc+rcCTfq3An36twLe+rcCD/u3AkD7twKh+7cC0vu3AjP8twJk/LcCxfy3Aib9twJX/bcC6f23Ahr+twJK/rcCe/63Aqv+twLc/rcCDf+3AsMAtwLzALcCJAG3AngCtwKpArcCCgO3AjsDtwJsA7cCnAO3As0DtwL+A7cCLgS3Al8EtwKQBLcCwAS3AvEEtwIiBbcCUgW3AoMFtwKzBbcC5AW3AhUGtwJFBrcCdga3AqcGtwLXBsgCPvvIAnP7yAKo+8gC3fvIAkf8yAKx/MgC5vzIAhv9yALv/cgCJP7IAlj+yAKN/sgCwv7IAvf+yAKwAsgC5QLIAhoDyAJPA8gChAPIArkDyALuA8gCIwTIAlgEyAKNBMgCwgTIAvcEyAIsBcgCYAXIApUFyALKBdkCPfvZAnf72QIl/NkCX/zZApn82QLT/NkC9f3ZAi/+2QJq/tkCpP7ZAt7+2QIY/9kCuQLZAi0D2QJnA9kCoQPZAtsD2QIVBNkCTwTZAokE2QLDBNkC/QTqAnz86gK8/OoC/v3qAj7+6gJ+/uoCv/7qAv/+6gJDAuoChAPqAsQD6gIFBOoCRQT7Ajj7+wKA+/sCEPz7Alj8+wJ4/fsCwP37Agj++wJQ/vsCmP77AuD++wIo//sCiAL7AvAD+wI4BA==";
  var bin = atob(RAW), n = bin.length / 2, LAND = new Float32Array(n);
  for (var i = 0; i < n; i++) { var v = bin.charCodeAt(i * 2) | (bin.charCodeAt(i * 2 + 1) << 8); if (v > 32767) v -= 65536; LAND[i] = v / 10; }
  // convert to unit vectors once
  var D2R = Math.PI / 180, PTS = new Float32Array(n / 2 * 3);
  for (i = 0; i < n / 2; i++) { var la = LAND[i * 2] * D2R, lo = LAND[i * 2 + 1] * D2R; PTS[i * 3] = Math.cos(la) * Math.cos(lo); PTS[i * 3 + 1] = Math.cos(la) * Math.sin(lo); PTS[i * 3 + 2] = Math.sin(la); }

  function vec(lat, lon) { var a = lat * D2R, o = lon * D2R; return [Math.cos(a) * Math.cos(o), Math.cos(a) * Math.sin(o), Math.sin(a)]; }

  var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  var label = host.querySelector(".globe-label");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 0, R = 0, cx = 0, cy = 0, dpr = 1;
  var rotLon = 40, rotLat = 18, velLon = 0, dragging = false, lastX = 0, lastY = 0, tiltTarget = 18, hover = false;
  var AUTO = 5; // degrees per second

  function size() {
    var w = host.clientWidth; dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = w; canvas.width = w * dpr; canvas.height = w * dpr;
    canvas.style.width = w + "px"; canvas.style.height = w + "px";
    R = w * 0.4; cx = cy = w / 2;
  }

  // rotate a unit vector into view space; returns [sx, sy, depth]
  var cl, sl, cp, sp;
  function setRot() { var l = -rotLon * D2R, p = rotLat * D2R; cl = Math.cos(l); sl = Math.sin(l); cp = Math.cos(p); sp = Math.sin(p); }
  function view(x, y, z) {
    var x1 = x * cl - y * sl, y1 = x * sl + y * cl;           // spin around polar axis
    var depth = x1 * cp + z * sp, up = -x1 * sp + z * cp;     // tilt
    return [y1, up, depth];
  }

  // flights
  var flights = [], nextLaunch = 0, di = 0, FLY = 2600, STAY = 1600, FADE = 900;
  function launch(now) {
    var d = DESTS[di % DESTS.length]; di++;
    var a = vec(DHAKA.lat, DHAKA.lon), b = vec(d.lat, d.lon);
    var dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), ang = Math.acos(dot);
    flights.push({ d: d, a: a, b: b, ang: ang, h: 0.08 + ang * 0.09, t0: now, landed: false });
  }
  function arcPoint(f, t) {
    var s = Math.sin(f.ang), k1 = Math.sin((1 - t) * f.ang) / s, k2 = Math.sin(t * f.ang) / s, alt = 1 + f.h * Math.sin(Math.PI * t);
    return [(f.a[0] * k1 + f.b[0] * k2) * alt, (f.a[1] * k1 + f.b[1] * k2) * alt, (f.a[2] * k1 + f.b[2] * k2) * alt];
  }
  function visible3(v) { var p = view(v[0], v[1], v[2]); return { x: cx + p[0] * R, y: cy - p[1] * R, z: p[2], vis: p[2] > 0 || (p[0] * p[0] + p[1] * p[1]) > 1.0 }; }

  function drawPin(v, color, r, pulse) {
    var p = visible3(v); if (p.z <= 0) return null;
    if (pulse !== undefined) { ctx.beginPath(); ctx.arc(p.x * dpr, p.y * dpr, r + pulse * 10 * dpr, 0, 7); ctx.strokeStyle = "rgba(" + color + "," + (1 - pulse) * 0.6 + ")"; ctx.lineWidth = 1.5 * dpr; ctx.stroke(); }
    ctx.beginPath(); ctx.arc(p.x * dpr, p.y * dpr, r, 0, 7); ctx.fillStyle = "rgb(" + color + ")"; ctx.fill();
    return p;
  }
  function drawPlane(x, y, ang, s) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(9, 0); ctx.lineTo(-3, -1.2); ctx.lineTo(-6, -7); ctx.lineTo(-8, -7); ctx.lineTo(-5, -1.2); ctx.lineTo(-9, -1); ctx.lineTo(-10.5, -4);
    ctx.lineTo(-11.5, -4); ctx.lineTo(-11, 0); ctx.lineTo(-11.5, 4); ctx.lineTo(-10.5, 4); ctx.lineTo(-9, 1); ctx.lineTo(-5, 1.2); ctx.lineTo(-8, 7); ctx.lineTo(-6, 7); ctx.lineTo(-3, 1.2); ctx.closePath();
    ctx.fillStyle = "#fff"; ctx.shadowColor = "rgba(255,212,59,.9)"; ctx.shadowBlur = 8; ctx.fill(); ctx.restore();
  }

  function frame(now, dt) {
    setRot();
    var w = W * dpr, r = R * dpr, X = cx * dpr, Y = cy * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, w, w);

    // atmosphere glow
    var g = ctx.createRadialGradient(X, Y, r * 0.9, X, Y, r * 1.28);
    g.addColorStop(0, "rgba(" + C.rim + ",.22)"); g.addColorStop(1, "rgba(" + C.rim + ",0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(X, Y, r * 1.28, 0, 7); ctx.fill();
    // ocean
    var s = ctx.createRadialGradient(X - r * .35, Y - r * .4, r * .1, X, Y, r);
    s.addColorStop(0, C.sea1); s.addColorStop(1, C.sea2);
    ctx.fillStyle = s; ctx.beginPath(); ctx.arc(X, Y, r, 0, 7); ctx.fill();
    ctx.strokeStyle = "rgba(" + C.rim + ",.35)"; ctx.lineWidth = 1.2 * dpr; ctx.stroke();

    // land dots
    var ds = Math.max(1.1, r / 170);
    for (var i = 0, m = PTS.length; i < m; i += 3) {
      var p = view(PTS[i], PTS[i + 1], PTS[i + 2]);
      if (p[2] <= 0.02) continue;
      ctx.fillStyle = "rgba(" + C.dot + "," + (0.35 + p[2] * 0.65).toFixed(2) + ")";
      var sz = ds * (0.6 + p[2] * 0.5);
      ctx.fillRect(X + p[0] * r - sz / 2, Y - p[1] * r - sz / 2, sz, sz);
    }

    // flights
    if (!reduce) {
      if (now >= nextLaunch) { launch(now); nextLaunch = now + 1500; }
    }
    var keep = [];
    for (var f = 0; f < flights.length; f++) {
      var fl = flights[f], age = reduce ? FLY : now - fl.t0, t = Math.min(1, age / FLY), te = 1 - Math.pow(1 - t, 2.2);
      var alpha = age > FLY + STAY ? Math.max(0, 1 - (age - FLY - STAY) / FADE) : 1;
      if (alpha <= 0) continue; keep.push(fl);
      var steps = 60, prev = null;
      ctx.lineCap = "round";
      for (var k = 0; k <= steps; k++) {
        var tt = te * k / steps, q = visible3(arcPoint(fl, tt));
        if (prev && q.vis && prev.vis) {
          ctx.beginPath(); ctx.moveTo(prev.x * dpr, prev.y * dpr); ctx.lineTo(q.x * dpr, q.y * dpr);
          var fadeTail = 0.25 + 0.75 * (k / steps);
          ctx.strokeStyle = "rgba(" + C.arc + "," + (alpha * fadeTail).toFixed(3) + ")"; ctx.lineWidth = 1.8 * dpr; ctx.stroke();
        }
        prev = q;
      }
      if (t < 1 && prev && prev.vis) {
        var q2 = visible3(arcPoint(fl, Math.min(1, te + 0.01)));
        drawPlane(prev.x * dpr, prev.y * dpr, Math.atan2(q2.y - prev.y, q2.x - prev.x), dpr * 1.1);
      }
      if (t >= 1) {
        var pin = drawPin(fl.b, C.white, 3 * dpr, ((age - FLY) % 1200) / 1200);
        if (pin) { ctx.font = "700 " + 11 * dpr + "px Montserrat, system-ui, sans-serif"; ctx.fillStyle = "rgba(255,255,255," + alpha + ")"; ctx.fillText(fl.d.code, pin.x * dpr + 7 * dpr, pin.y * dpr - 6 * dpr); }
        if (!fl.landed) { fl.landed = true; if (label && !reduce) setLabel(fl.d); }
      }
    }
    flights = keep;
    // Dhaka
    var dp = drawPin(vec(DHAKA.lat, DHAKA.lon), "255,212,59", 4 * dpr, reduce ? undefined : (now % 1800) / 1800);
    if (dp) { ctx.font = "800 " + 11 * dpr + "px Montserrat, system-ui, sans-serif"; ctx.fillStyle = "#FFD43B"; ctx.fillText("DAC", dp.x * dpr + 8 * dpr, dp.y * dpr + 4 * dpr); }
  }

  function setLabel(d) {
    label.classList.add("swap");
    setTimeout(function () { label.querySelector("b").textContent = d.code + " · " + d.city; label.classList.remove("swap"); }, 250);
  }

  // interaction: drag to spin (mouse + touch), gentle tilt follow on hover
  canvas.addEventListener("pointerdown", function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; velLon = 0; canvas.setPointerCapture(e.pointerId); host.classList.add("grabbing"); });
  canvas.addEventListener("pointermove", function (e) {
    var rect = canvas.getBoundingClientRect();
    if (dragging) {
      var dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
      rotLon -= dx * 0.35; velLon = -dx * 0.35; tiltTarget = Math.max(-35, Math.min(55, tiltTarget + dy * 0.25));
      if (reduce) draw();
    } else if (e.pointerType === "mouse") {
      hover = true; tiltTarget = 18 + ((e.clientY - rect.top) / rect.height - 0.5) * -24;
    }
  });
  function end() { dragging = false; host.classList.remove("grabbing"); }
  canvas.addEventListener("pointerup", end); canvas.addEventListener("pointercancel", end);
  canvas.addEventListener("pointerleave", function () { hover = false; if (!dragging) tiltTarget = 18; });
  canvas.style.touchAction = "pan-y";

  var last = 0, running = true, onScreen = true;
  function loop(ts) {
    var dt = last ? Math.min(0.05, (ts - last) / 1000) : 0; last = ts;
    if (!dragging) { rotLon += (AUTO * (hover ? 0.4 : 1)) * dt + velLon; velLon *= 0.92; }
    rotLat += (tiltTarget - rotLat) * Math.min(1, dt * 4);
    frame(ts, dt);
    if (running && onScreen) requestAnimationFrame(loop); else last = 0;
  }
  function draw() { frame(performance.now(), 0); }
  function start() { if (!reduce && running && onScreen) requestAnimationFrame(loop); }

  size();
  window.addEventListener("resize", function () { size(); if (reduce) draw(); });
  if (reduce) {
    // static view: all routes drawn, nothing moves by itself (dragging still works)
    DESTS.forEach(function () { launch(0); }); flights.forEach(function (f) { f.t0 = -9e9; });
    FADE = STAY = 1e12; rotLon = 45; setRot(); draw();
    if (label) { label.querySelector("span").textContent = "Routes from Dhaka"; label.querySelector("b").textContent = DESTS.length + " cities"; }
  } else {
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; if (onScreen) start(); }).observe(host);
    document.addEventListener("visibilitychange", function () { running = !document.hidden; if (running) start(); });
    start();
  }
})();
