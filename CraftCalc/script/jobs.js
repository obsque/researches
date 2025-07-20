const not_use = [
    [1, 4, 0],
    [2, 4, 0],
    [6, 3, [6,3,4]]
];
const JOBS = [
    ["PLD", "WAR", "DRK", "GNB"],
    ["WHM", "SCH", "AST", "SGE"],
    [
        ["MNK", "DRG", "NIN", "SAM", "RPR", "VPR"],
        ["BRD", "MCH", "DNC"],
        ["BLM", "SMN", "RDM", "PIC"]
    ]
]
const ROLE_JOB = [
    {'role' : "tank", 'jobs' : ["PLD", "WAR", "DRK", "GNB"]},
    {'role' : "healer", 'jobs' : ["WHM", "SCH", "AST", "SGE"]},
    {'role' : "dps", 'jobs' : [
        {'role' : "melee", 'jobs' : ["MNK", "DRG", "NIN", "SAM", "RPR", "VPR"]},
        {'role' : "ranged", 'jobs' : ["BRD", "MCH", "DNC"]},
        {'role' : "casters", 'jobs' : ["BLM", "SMN", "RDM", "PIC"]}
    ]}
]
