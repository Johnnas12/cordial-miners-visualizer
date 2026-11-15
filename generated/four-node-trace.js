window.__FOUR_NODE_TRACE__ = {
  "scenario": "four-node convergence",
  "wavelength": 3,
  "n": 4,
  "f": 1,
  "blocks": [
    {
      "id": "L1",
      "label": "L1",
      "creator": "V1",
      "round": 0,
      "role": "leader",
      "deps": []
    },
    {
      "id": "W2",
      "label": "W2",
      "creator": "V2",
      "round": 1,
      "role": "witness",
      "deps": [
        "L1"
      ]
    },
    {
      "id": "W3",
      "label": "W3",
      "creator": "V3",
      "round": 1,
      "role": "witness",
      "deps": [
        "L1"
      ]
    },
    {
      "id": "W4",
      "label": "W4",
      "creator": "V4",
      "round": 1,
      "role": "witness",
      "deps": [
        "L1"
      ]
    },
    {
      "id": "S2",
      "label": "S2",
      "creator": "V2",
      "round": 2,
      "role": "super",
      "deps": [
        "W2",
        "W3",
        "W4"
      ]
    },
    {
      "id": "S3",
      "label": "S3",
      "creator": "V3",
      "round": 2,
      "role": "super",
      "deps": [
        "W2",
        "W3",
        "W4"
      ]
    },
    {
      "id": "S4",
      "label": "S4",
      "creator": "V4",
      "round": 2,
      "role": "super",
      "deps": [
        "W2",
        "W3",
        "W4"
      ]
    }
  ],
  "events": [
    {
      "kind": "partition",
      "title": "Observer C partitioned",
      "detail": "Observer C is temporarily cut off and can only see a partial view of the wave.",
      "node": "C",
      "block": null,
      "outcome": null
    },
    {
      "kind": "deliver",
      "title": "Observer A receives L1",
      "detail": "A accepted L1 into its local blocklace.",
      "node": "A",
      "block": "L1",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer A receives W2",
      "detail": "A accepted W2 into its local blocklace.",
      "node": "A",
      "block": "W2",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer A receives W3",
      "detail": "A accepted W3 into its local blocklace.",
      "node": "A",
      "block": "W3",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer A receives W4",
      "detail": "A accepted W4 into its local blocklace.",
      "node": "A",
      "block": "W4",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer A receives S2",
      "detail": "A accepted S2 into its local blocklace.",
      "node": "A",
      "block": "S2",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer A receives S3",
      "detail": "A accepted S3 into its local blocklace.",
      "node": "A",
      "block": "S3",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer A receives S4",
      "detail": "A accepted S4 into its local blocklace.",
      "node": "A",
      "block": "S4",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer B receives S3",
      "detail": "B buffered S3 because one or more predecessors were still missing.",
      "node": "B",
      "block": "S3",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer B receives W2",
      "detail": "B buffered W2 because one or more predecessors were still missing.",
      "node": "B",
      "block": "W2",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer B receives S2",
      "detail": "B buffered S2 because one or more predecessors were still missing.",
      "node": "B",
      "block": "S2",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer B receives L1",
      "detail": "B accepted L1 into its local blocklace.",
      "node": "B",
      "block": "L1",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer B receives W4",
      "detail": "B accepted W4 into its local blocklace.",
      "node": "B",
      "block": "W4",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer B receives S4",
      "detail": "B buffered S4 because one or more predecessors were still missing.",
      "node": "B",
      "block": "S4",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer B receives W3",
      "detail": "B accepted W3 into its local blocklace.",
      "node": "B",
      "block": "W3",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer C receives L1",
      "detail": "C accepted L1 into its local blocklace.",
      "node": "C",
      "block": "L1",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer C receives W2",
      "detail": "C accepted W2 into its local blocklace.",
      "node": "C",
      "block": "W2",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer D receives L1",
      "detail": "D accepted L1 into its local blocklace.",
      "node": "D",
      "block": "L1",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer D receives W4",
      "detail": "D accepted W4 into its local blocklace.",
      "node": "D",
      "block": "W4",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer D receives S4",
      "detail": "D buffered S4 because one or more predecessors were still missing.",
      "node": "D",
      "block": "S4",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer D receives W3",
      "detail": "D accepted W3 into its local blocklace.",
      "node": "D",
      "block": "W3",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer D receives S3",
      "detail": "D buffered S3 because one or more predecessors were still missing.",
      "node": "D",
      "block": "S3",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer D receives W2",
      "detail": "D accepted W2 into its local blocklace.",
      "node": "D",
      "block": "W2",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer D receives S2",
      "detail": "D accepted S2 into its local blocklace.",
      "node": "D",
      "block": "S2",
      "outcome": "inserted"
    },
    {
      "kind": "heal",
      "title": "Observer C heals",
      "detail": "Observer C reconnects and can now receive the missing witness blocks.",
      "node": "C",
      "block": null,
      "outcome": null
    },
    {
      "kind": "deliver",
      "title": "Observer C receives S4",
      "detail": "C buffered S4 after heal because some predecessors were still missing.",
      "node": "C",
      "block": "S4",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer C receives W4",
      "detail": "C accepted W4 after the partition healed.",
      "node": "C",
      "block": "W4",
      "outcome": "inserted"
    },
    {
      "kind": "deliver",
      "title": "Observer C receives S2",
      "detail": "C buffered S2 after heal because some predecessors were still missing.",
      "node": "C",
      "block": "S2",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer C receives S3",
      "detail": "C buffered S3 after heal because some predecessors were still missing.",
      "node": "C",
      "block": "S3",
      "outcome": "buffered"
    },
    {
      "kind": "deliver",
      "title": "Observer C receives W3",
      "detail": "C accepted W3 after the partition healed.",
      "node": "C",
      "block": "W3",
      "outcome": "inserted"
    }
  ],
  "snapshots": [
    {
      "step": 0,
      "latest_message": "Replay loaded. Observer C will start in a partitioned state.",
      "active_block": null,
      "nodes": {
        "A": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 1,
      "latest_message": "Observer C is partitioned and will lag behind the rest.",
      "active_block": null,
      "nodes": {
        "A": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 2,
      "latest_message": "A accepted L1 into its local blocklace.",
      "active_block": "L1",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 3,
      "latest_message": "A accepted W2 into its local blocklace.",
      "active_block": "W2",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 4,
      "latest_message": "A accepted W3 into its local blocklace.",
      "active_block": "W3",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 5,
      "latest_message": "A accepted W4 into its local blocklace.",
      "active_block": "W4",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 6,
      "latest_message": "A accepted S2 into its local blocklace.",
      "active_block": "S2",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 7,
      "latest_message": "A accepted S3 into its local blocklace.",
      "active_block": "S3",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 8,
      "latest_message": "A accepted S4 into its local blocklace.",
      "active_block": "S4",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 9,
      "latest_message": "B buffered S3 because one or more predecessors were still missing.",
      "active_block": "S3",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 10,
      "latest_message": "B buffered W2 because one or more predecessors were still missing.",
      "active_block": "W2",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 11,
      "latest_message": "B buffered S2 because one or more predecessors were still missing.",
      "active_block": "S2",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 12,
      "latest_message": "B accepted L1 into its local blocklace.",
      "active_block": "L1",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 13,
      "latest_message": "B accepted W4 into its local blocklace.",
      "active_block": "W4",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 14,
      "latest_message": "B buffered S4 because one or more predecessors were still missing.",
      "active_block": "S4",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 15,
      "latest_message": "B accepted W3 into its local blocklace.",
      "active_block": "W3",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 16,
      "latest_message": "C accepted L1 into its local blocklace.",
      "active_block": "L1",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 17,
      "latest_message": "C accepted W2 into its local blocklace.",
      "active_block": "W2",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 18,
      "latest_message": "D accepted L1 into its local blocklace.",
      "active_block": "L1",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 19,
      "latest_message": "D accepted W4 into its local blocklace.",
      "active_block": "W4",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 20,
      "latest_message": "D buffered S4 because one or more predecessors were still missing.",
      "active_block": "S4",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 21,
      "latest_message": "D accepted W3 into its local blocklace.",
      "active_block": "W3",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 22,
      "latest_message": "D buffered S3 because one or more predecessors were still missing.",
      "active_block": "S3",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 23,
      "latest_message": "D accepted W2 into its local blocklace.",
      "active_block": "W2",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 24,
      "latest_message": "D accepted S2 into its local blocklace.",
      "active_block": "S2",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4",
            "W2"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        }
      }
    },
    {
      "step": 25,
      "latest_message": "Buffered deliveries were retried after the first delivery pass.",
      "active_block": null,
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": true,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        }
      }
    },
    {
      "step": 26,
      "latest_message": "Observer C healed and can now catch up on the missing wave evidence.",
      "active_block": null,
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "C": {
          "known": [
            "L1",
            "W2"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        }
      }
    },
    {
      "step": 27,
      "latest_message": "C buffered S4 after heal because some predecessors were still missing.",
      "active_block": "S4",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "C": {
          "known": [
            "L1",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        }
      }
    },
    {
      "step": 28,
      "latest_message": "C accepted W4 after the partition healed.",
      "active_block": "W4",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "C": {
          "known": [
            "L1",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        }
      }
    },
    {
      "step": 29,
      "latest_message": "C buffered S2 after heal because some predecessors were still missing.",
      "active_block": "S2",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "C": {
          "known": [
            "L1",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        }
      }
    },
    {
      "step": 30,
      "latest_message": "C buffered S3 after heal because some predecessors were still missing.",
      "active_block": "S3",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "C": {
          "known": [
            "L1",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        }
      }
    },
    {
      "step": 31,
      "latest_message": "C accepted W3 after the partition healed.",
      "active_block": "W3",
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "C": {
          "known": [
            "L1",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [
            "S2",
            "S3",
            "S4"
          ],
          "partitioned": false,
          "final_leader": null,
          "tau": []
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        }
      }
    },
    {
      "step": 32,
      "latest_message": "All buffers were retried again. The observers now share the same final leader and tau output.",
      "active_block": null,
      "nodes": {
        "A": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "B": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "C": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        },
        "D": {
          "known": [
            "L1",
            "S2",
            "S3",
            "S4",
            "W2",
            "W3",
            "W4"
          ],
          "buffered": [],
          "partitioned": false,
          "final_leader": "L1",
          "tau": [
            "L1"
          ]
        }
      }
    }
  ]
};
