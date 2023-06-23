const data = [
  [37.25491142866979, 92.3835287538828, 3444.7401811938726],
  [24.229044367164974, 83.18674594409745, 2018.535358239618],
  [76.35710432858363, 61.675912627793195, 4712.394095081014],
  [49.90232145161884, 58.45581851790096, 2920.081046397787],
  [30.756195106086736, 78.93731673498941, 2430.8115146523],
  [8.755201974725079, 21.11807961228813, 187.89305232390646],
  [76.79233425018381, 36.02658131339227, 2769.5652741094455],
  [76.73461869644484, 56.66778131184023, 4351.380591337583],
  [71.64735654585425, 42.13514689593036, 3021.8718927646664],
  [30.2847214596939, 88.64879331851586, 2687.704013389226],
  [33.22421286615966, 26.490687773499012, 883.1322495577043],
  [31.355229327485223, 50.09437294971348, 1573.7205518548385],
  [87.31624178809005, 84.84831476419401, 7411.635967262336],
  [46.8120746968246, 83.73581733280733, 3922.847335783037],
  [26.923464490214965, 70.93415442626865, 1912.7931878390687],
  [93.82288462154169, 32.7147613293139, 3072.393277621492],
  [98.52258412422918, 84.94394379608501, 8371.896848493581],
  [25.34022804428846, 84.85603633183159, 2153.2713115830393],
  [20.84714978620341, 2.2340764228446996, 49.57412582086896],
  [32.14304906707655, 23.416595720343114, 755.6807852228834],
  [4.681556032873879, 68.29729819894447, 322.7376284122548],
  [38.66173959436507, 43.7209444008843, 1693.3277672467025],
  [80.22992315069632, 66.16338547010629, 5311.283331656526],
  [44.27328209084149, 61.750772881116724, 2736.9093870931656],
  [17.73980568024074, 0.34633519238258526, 9.143919013095855],
  [79.794190908241, 54.835322535578435, 4378.540194918916],
  [32.21482124015815, 82.23050891435237, 2652.041145163093],
  [18.32717275546909, 2.995145123515308, 57.89254210636585],
  [91.06387795755747, 88.2291324161692, 8037.486946647208],
  [79.83107290280336, 89.95744938899502, 7184.399700323104],
  [45.5395980971542, 32.4933857629303, 1482.735728459638],
  [27.141444513370196, 79.86219945155553, 2170.575455130098],
  [51.54855302527026, 76.38017591307668, 3940.2875481347037],
  [95.30738235968839, 97.79574620467166, 9323.656576679687],
  [74.4646992081282, 69.41276738802972, 5171.800844753403],
  [19.17481711227065, 93.9405970669392, 1804.2937681760677],
  [89.68386822340928, 50.54686761245597, 4536.238614061615],
  [13.973299004446238, 76.22286535385301, 1068.084888565034],
  [45.010466308780764, 55.879655437905406, 2518.169348434119],
  [51.2186228838982, 33.046714614204184, 1695.6072133767314],
  [1.8924215516564535, 40.242734144723144, 79.15621739305512],
  [50.12059079353717, 28.910096608259607, 1451.9911219042067],
  [20.690810621097675, 83.67366384500805, 1734.2759325904492],
  [57.194071293900414, 49.245920512299634, 2819.574688714218],
  [68.90452312294858, 79.2188586278045, 5461.537676093149],
  [31.373085592540374, 30.569754022515117, 962.0675094912722],
  [22.454347061507928, 56.77718996900845, 1277.8947287412823],
  [90.31852852015388, 98.14859093981684, 8867.636310010765],
  [46.105747411341234, 76.97946170018346, 3552.1956170096755],
  [94.75515193853103, 59.45818050338878, 5636.968927587207],
  [87.60059526646822, 15.89773077392842, 1395.65067918218],
  [70.80399383288467, 39.861738494642985, 2825.3702865427636],
  [6.229220178621397, 14.285699158036035, 91.98876546095278],
  [80.40178896411541, 57.65290832228458, 4638.396968095818],
  [30.224324162652817, 5.830822146820935, 179.23265870029115],
  [41.793550984478166, 70.15437891404181, 2935.0006119284067],
  [75.77198858417611, 50.98292757277496, 3866.0778060321823],
  [9.673110942591002, 90.87652503002244, 882.0587086925551],
  [91.19935152695604, 51.5526116893362, 4704.564755588435],
  [41.560161155398355, 47.114927368252026, 1961.1039742494427],
  [56.757790022882126, 90.8223271982613, 5157.874576508411],
  [26.91275166147138, 95.27601448582521, 2567.1397171517638],
  [16.67699356269754, 63.78021808888392, 1066.6622864957624],
  [32.022772359114995, 53.27536439863463, 1709.0248664863761],
  [96.23673184635489, 48.4442950334522, 4665.120630620041],
  [27.326247826024243, 0.09777814575144816, 5.671909842773192],
  [67.49234094522114, 91.20332328539521, 6158.52579051512],
  [77.651745241973, 78.6923873589527, 6113.601215680052],
  [93.23940132950872, 22.186709896564526, 2071.675548227163],
  [14.73276558285701, 34.90540106442941, 517.253091457846],
  [79.12325516277888, 63.616385360050984, 5036.535491376984],
  [25.484468480886836, 97.66531111156658, 2491.9485426987253],
  [46.42048841015789, 17.143316901749415, 798.8011435493225],
  [8.942631437390114, 6.206979737270912, 58.50673212976229],
  [46.19539302184042, 53.33427121664411, 2466.7976203863054],
  [38.45031990877832, 51.40939250053789, 1979.707587961631],
  [1.9827500029053535, 33.97531938947252, 70.36456461818695],
  [82.945472362637, 8.123726695796996, 676.8263481278462],
  [41.534634436642094, 22.210637026749414, 925.5106895109842],
  [15.19457643918718, 71.8860226787301, 1095.2776665011077],
  [16.268500279538188, 56.4202190284554, 920.8723490360325],
  [74.69302448384498, 77.20726630646364, 5769.844232559428],
  [12.589864184433042, 55.80968164203273, 705.636312049638],
  [22.48277177196918, 5.146047216471428, 118.69740509570438],
  [61.477561749638696, 59.442997369061025, 3657.41054134006],
  [17.72128530150181, 35.97758903258432, 640.5691197066092],
  [16.69211815987488, 31.292964831856153, 525.345866546152],
  [49.021709330841425, 77.84594195763732, 3819.1411392328496],
  [39.70098344542612, 6.7545139990218495, 271.1608484570654],
  [53.74408948651941, 97.08077164133049, 5220.517678512021],
  [0.9702736236671727, 93.23822354451568, 93.46658902282712],
  [2.951990592840481, 52.523737367942914, 158.04957861099152],
  [84.74877295372876, 69.08367790083699, 5857.756933226563],
  [47.81676615955308, 52.870074562648114, 2531.075992200281],
  [46.2916677672347, 20.431193969292096, 948.7940433143989],
  [23.636466185821114, 86.79762887697441, 2054.589219960056],
  [98.65377090101788, 95.48392104012133, 9422.84887102301],
  [46.071261030133684, 10.720403256877887, 496.9024967959164],
  [35.53595787235855, 80.61791136433425, 2867.8347020005176],
  [23.34287983115808, 97.95026850787742, 2289.4413472090505],
];
export default data;
