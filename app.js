/**
 * CascadePulse Delhi NCR // Critical Infrastructure Cascading Failure Simulation Engine
 * Problem Statement P05: Disaster Resilience & Critical Infrastructure
 * Tailored for National Capital Territory (NCT) of Delhi & NCR Lifelines
 */

// 1. DATA MODEL: NCT of Delhi Critical Infrastructure Assets & Dependencies
const INFRASTRUCTURE_GRAPH = {
  nodes: [
    // --- Power & Energy Grid (Delhi Transco Limited / DTL) ---
    {
      id: "sub_bawana",
      name: "Bawana 400kV Primary Grid Substation",
      sector: "power",
      category: "Power Grid (DTL 400kV)",
      desc: "North-West Delhi's primary bulk power transmission node stepping down 400kV from Northern Regional Grid.",
      population: 320000,
      isLifeline: true,
      backupSystem: "Ring Grid Bus Tie to Mandola (Limited)",
      capacity: 1200, // Megawatts
      x: 230, y: 190
    },
    {
      id: "sub_maharani_bagh",
      name: "Maharani Bagh 400kV Substation",
      sector: "power",
      category: "Substation (DTL South)",
      desc: "Key transmission substation powering South Delhi, Okhla industrial area, and metro corridors.",
      population: 240000,
      isLifeline: false,
      backupSystem: "Cross-tie to Badarpur line",
      capacity: 650,
      x: 170, y: 390
    },
    {
      id: "igi_solar_reserve",
      name: "IGI Airport Solar Microgrid & BESS",
      sector: "power",
      category: "Renewable Storage",
      desc: "Utility-scale 25MW solar array with 100MWh battery energy storage for aviation and essential services.",
      population: 85000,
      isLifeline: false,
      backupSystem: "Autonomous BESS Inverter Array",
      capacity: 100,
      x: 110, y: 270
    },

    // --- Water & Sanitation (Delhi Jal Board - DJB) ---
    {
      id: "wazirabad_wtp",
      name: "Wazirabad Water Treatment Plant (DJB)",
      sector: "water",
      category: "Potable Water (DJB)",
      desc: "Premier 135 MGD water treatment facility purifying Yamuna raw water for Central, North, and South Delhi.",
      population: 450000,
      isLifeline: true,
      backupSystem: "Sensor UPS (High-pressure pumps require high-tension grid)",
      capacity: 135, // MGD
      x: 430, y: 150
    },
    {
      id: "sonia_vihar_wtp",
      name: "Sonia Vihar Water Treatment Plant",
      sector: "water",
      category: "Ganga Canal Booster",
      desc: "140 MGD water plant treating Upper Ganga Canal water for East and South Delhi.",
      population: 380000,
      isLifeline: false,
      backupSystem: "Gravity reservoir (2h buffer)",
      capacity: 140,
      x: 590, y: 130
    },

    // --- Transportation & Mobility (Delhi Traffic Police & DMRC) ---
    {
      id: "delhi_traffic_hub",
      name: "Delhi Traffic Police Central Control Room",
      sector: "transit",
      category: "Traffic Management (Todapur)",
      desc: "Centralized Intelligent Traffic Management System controlling 1,200+ signals along Ring Road and Outer Ring Road.",
      population: 400000,
      isLifeline: false,
      backupSystem: "45-minute Server UPS",
      capacity: 1200,
      x: 390, y: 300
    },
    {
      id: "signature_bridge",
      name: "Signature Bridge & Yamuna Corridor",
      sector: "transit",
      category: "Arterial Highway (Trans-Yamuna)",
      desc: "Eight-lane vital Yamuna crossing carrying 110,000 vehicles/day, primary emergency route from North/East Delhi to Trauma Centers.",
      population: 180000,
      isLifeline: true,
      backupSystem: "Manual Traffic Police Deployment",
      capacity: 110000,
      x: 570, y: 280
    },
    {
      id: "dmrc_yellow_line",
      name: "DMRC Yellow Line (Rajiv Chowk Hub)",
      sector: "transit",
      category: "Mass Rapid Transit (Metro)",
      desc: "Crucial North-South underground transit artery connecting Samaypur Badli to Millennium City Gurugram.",
      population: 550000,
      isLifeline: false,
      backupSystem: "DMRC auxiliary battery tunnel illumination",
      capacity: 550000,
      x: 470, y: 420
    },

    // --- Healthcare & Public Safety Lifelines ---
    {
      id: "aiims_trauma",
      name: "AIIMS New Delhi (Apex Trauma Center)",
      sector: "health",
      category: "Apex Level-1 Trauma Hospital",
      desc: "India's premier 1,500-bed apex referral institution handling critical trauma, ICUs, and emergency surgical suites.",
      population: 150000,
      isLifeline: true,
      backupSystem: "Emergency Diesel Generators (Dual 2,000 kVA, 6h on-site fuel)",
      capacity: 1500,
      x: 770, y: 210
    },
    {
      id: "safdarjung_hospital",
      name: "Safdarjung Hospital Emergency Care",
      sector: "health",
      category: "Urgent Medical Care",
      desc: "Major 2,900-bed central government multi-specialty hospital with acute burns & emergency block.",
      population: 120000,
      isLifeline: false,
      backupSystem: "Shared central generator bank",
      capacity: 2900,
      x: 890, y: 310
    },
    {
      id: "delhi_112_dispatch",
      name: "Delhi 112 / DDMA State Operations Center",
      sector: "health",
      category: "Emergency PSAP (Police/Fire/Ambulance)",
      desc: "Consolidated Central Public Safety Answering Point routing Delhi Police, Delhi Fire Service, and CATS Ambulances.",
      population: 600000,
      isLifeline: true,
      backupSystem: "Dual Tier-3 Generators + High-Capacity Flywheel UPS",
      capacity: 150,
      x: 720, y: 360
    },

    // --- Communications & Strategic Logistics ---
    {
      id: "cp_telecom_exchange",
      name: "Connaught Place Fiber & Telecom Core",
      sector: "comms",
      category: "Fiber Telecom Core (MTNL/BSNL)",
      desc: "Eastern Court central telecom switching hub routing critical banking, cellular backhaul, and civil communications.",
      population: 500000,
      isLifeline: true,
      backupSystem: "Industrial DC Battery Bank (3h buffer)",
      capacity: 25000,
      x: 310, y: 440
    },
    {
      id: "ioc_bijwasan_depot",
      name: "IOCL Strategic Emergency Fuel Depot",
      sector: "comms",
      category: "Strategic Fuel Reserve (Bijwasan)",
      desc: "Northern India's largest oil storage depot supplying diesel for emergency generators, police vehicles, and CATS ambulances.",
      population: 100000,
      isLifeline: false,
      backupSystem: "Manual gravity discharge override",
      capacity: 1500000, // Liters
      x: 620, y: 490
    },
    {
      id: "district_rohini",
      name: "Rohini & Pitampura Residential Sector",
      sector: "comms",
      category: "Urban Residential District",
      desc: "Dense residential zone of 320,000 residents dependent on Wazirabad water supply and Bawana electrical grid.",
      population: 320000,
      isLifeline: false,
      backupSystem: "None (Direct municipal feed)",
      capacity: 320000,
      x: 350, y: 40
    },
    {
      id: "district_okhla",
      name: "Okhla Industrial & Nehru Place Tech Hub",
      sector: "comms",
      category: "Commercial & Data Center Zone",
      desc: "High-density commercial corridor, light manufacturing, and primary IT hardware markets.",
      population: 240000,
      isLifeline: false,
      backupSystem: "Private building DG sets",
      capacity: 240000,
      x: 210, y: 540
    },
    {
      id: "igi_airport_t3",
      name: "Indira Gandhi International Airport (T3)",
      sector: "transit",
      category: "International Aviation Hub",
      desc: "South Asia's busiest airport handling 180,000 passengers daily, cargo logistics, and diplomatic flight corridors.",
      population: 180000,
      isLifeline: false,
      backupSystem: "Dedicated dual-turbine standby plant",
      capacity: 180000,
      x: 830, y: 480
    }
  ],

  // 24 Directed Dependencies for Delhi NCR Infrastructure
  edges: [
    // Power Distributions (DTL Grid)
    { source: "sub_bawana", target: "wazirabad_wtp", type: "powers", label: "400kV Dedicated Pump Line", critical: true },
    { source: "sub_bawana", target: "delhi_traffic_hub", type: "powers", label: "Ring Road Signal Power Feed", critical: true },
    { source: "sub_bawana", target: "cp_telecom_exchange", type: "powers", label: "Central Switch Electrical Supply", critical: true },
    { source: "sub_bawana", target: "aiims_trauma", type: "powers", label: "Dual Redundant Medical Feeder", critical: true },
    { source: "sub_bawana", target: "district_rohini", type: "powers", label: "North-West Delhi Domestic Grid", critical: false },
    { source: "sub_maharani_bagh", target: "district_okhla", type: "powers", label: "South Industrial Electrical Supply", critical: false },
    { source: "sub_maharani_bagh", target: "dmrc_yellow_line", type: "powers", label: "25kV Traction Power Supply", critical: true },
    { source: "igi_solar_reserve", target: "cp_telecom_exchange", type: "powers", label: "Clean Solar Emergency Link", critical: false },

    // Water Network (Delhi Jal Board)
    { source: "wazirabad_wtp", target: "sonia_vihar_wtp", type: "supplies", label: "Raw Water Interlink Aqueduct", critical: true },
    { source: "wazirabad_wtp", target: "aiims_trauma", type: "supplies", label: "Sterile Clinical Water Pipeline", critical: true },
    { source: "wazirabad_wtp", target: "district_rohini", type: "supplies", label: "Municipal Drinking Water Main", critical: false },
    { source: "sonia_vihar_wtp", target: "district_okhla", type: "supplies", label: "Pressurized Industrial Water Supply", critical: false },

    // Traffic Management & Yamuna Corridors
    { source: "delhi_traffic_hub", target: "signature_bridge", type: "controls", label: "Automated Arterial Signal Synchronization", critical: true },
    { source: "delhi_traffic_hub", target: "dmrc_yellow_line", type: "controls", label: "Multi-Modal Commuter Interlocking", critical: false },
    { source: "signature_bridge", target: "aiims_trauma", type: "routes", label: "Primary Emergency Green Corridor", critical: true },
    { source: "signature_bridge", target: "delhi_112_dispatch", type: "routes", label: "First Responder Rapid Access Route", critical: true },
    { source: "signature_bridge", target: "igi_airport_t3", type: "routes", label: "Airport Express Highway Access", critical: false },

    // Telecom & Public Safety Lifelines
    { source: "cp_telecom_exchange", target: "delhi_112_dispatch", type: "routes", label: "Dedicated Fiber 112 Hotline Trunks", critical: true },
    { source: "cp_telecom_exchange", target: "delhi_traffic_hub", type: "routes", label: "Ring Road CCTV Telemetry Network", critical: false },
    { source: "cp_telecom_exchange", target: "igi_airport_t3", type: "routes", label: "Air Traffic Control Data Highway", critical: true },
    { source: "delhi_112_dispatch", target: "aiims_trauma", type: "routes", label: "Apex Trauma Emergency Intake Dispatch", critical: true },
    { source: "delhi_112_dispatch", target: "safdarjung_hospital", type: "routes", label: "CATS Ambulance Triage Diversion", critical: false },

    // Emergency Fuel Logistics
    { source: "ioc_bijwasan_depot", target: "aiims_trauma", type: "fuels", label: "Diesel Generator Resupply Convoy", critical: true },
    { source: "aiims_trauma", target: "safdarjung_hospital", type: "overflow", label: "Emergency ICU Bed Overflow Transfer", critical: false }
  ]
};

// 2. SIMULATION ENGINE
class SimulationEngine {
  constructor(graph) {
    this.graph = graph;
    this.failedNodes = new Set();
    this.currentStep = 0;
    this.maxSteps = 4;
    this.nodeStates = new Map();
    this.eventLog = [];
    this.isPlaying = false;
    this.playTimer = null;
    this.playIntervalMs = 1200;
    
    // Delhi Specific Resilience Interventions
    this.interventions = {
      microgrid: false,
      ups: false,
      dieselPump: false
    };

    this.criticalityLeaderboard = [];
    this.calculateCriticalityRanking();
    this.resetSimulation();
  }

  resetSimulation() {
    this.failedNodes.clear();
    this.currentStep = 0;
    this.nodeStates.clear();
    this.eventLog = [];

    this.graph.nodes.forEach(node => {
      this.nodeStates.set(node.id, {
        state: "normal",
        hop: -1,
        reason: "Operational",
        stepFailed: -1
      });
    });

    if (this.isPlaying) {
      this.togglePlay(false);
    }
  }

  toggleNodeInitialFailure(nodeId) {
    if (this.failedNodes.has(nodeId)) {
      this.failedNodes.delete(nodeId);
    } else {
      this.failedNodes.add(nodeId);
    }
    this.recomputeSimulation();
  }

  setPresetDisaster(presetKey) {
    this.resetSimulation();
    switch (presetKey) {
      case "preset-substation":
        this.failedNodes.add("sub_bawana");
        break;
      case "preset-bridge":
        this.failedNodes.add("signature_bridge");
        break;
      case "preset-cyber":
        this.failedNodes.add("delhi_traffic_hub");
        break;
      case "preset-water":
        this.failedNodes.add("wazirabad_wtp");
        break;
      case "preset-compound":
        this.failedNodes.add("sub_bawana");
        this.failedNodes.add("signature_bridge");
        break;
    }
    this.recomputeSimulation();
  }

  setIntervention(name, active) {
    if (this.interventions.hasOwnProperty(name)) {
      this.interventions[name] = active;
      this.recomputeSimulation();
    }
  }

  recomputeSimulation() {
    this.nodeStates.clear();
    this.eventLog = [];

    this.graph.nodes.forEach(node => {
      this.nodeStates.set(node.id, {
        state: "normal",
        hop: -1,
        reason: "Operational",
        stepFailed: -1
      });
    });

    if (this.failedNodes.size === 0) {
      this.currentStep = 0;
      return;
    }

    // Step 0: Root Failures
    this.failedNodes.forEach(nodeId => {
      const node = this.graph.nodes.find(n => n.id === nodeId);
      this.nodeStates.set(nodeId, {
        state: "failed",
        hop: 0,
        reason: "Initial Disruption / Root Failure Point",
        stepFailed: 0
      });
      this.eventLog.push({
        step: 0,
        nodeId: nodeId,
        nodeName: node ? node.name : nodeId,
        state: "failed",
        message: `PRIMARY INCIDENT: [${node ? node.name : nodeId}] sustained sudden complete outage.`
      });
    });

    for (let s = 1; s <= this.currentStep; s++) {
      this.propagateStep(s);
    }
  }

  propagateStep(stepNumber) {
    const newlyAffected = [];

    this.graph.nodes.forEach(targetNode => {
      const currentState = this.nodeStates.get(targetNode.id);
      if (currentState.state === "failed") return;

      const incomingEdges = this.graph.edges.filter(e => e.target === targetNode.id);
      if (incomingEdges.length === 0) return;

      let failedFeedCount = 0;
      let criticalFeedFailed = false;
      let failedFeedNames = [];

      incomingEdges.forEach(edge => {
        const sourceState = this.nodeStates.get(edge.source);
        if (sourceState.state === "failed") {
          failedFeedCount++;
          failedFeedNames.push(edge.source);
          if (edge.critical) criticalFeedFailed = true;
        } else if (sourceState.state === "degraded" && edge.critical) {
          failedFeedCount += 0.5;
        }
      });

      if (failedFeedCount === 0) return;

      // Delhi Interventions Check
      if (targetNode.id === "aiims_trauma" && this.interventions.microgrid && failedFeedNames.includes("sub_bawana")) {
        return; // Dedicated Solar-BESS Microgrid shields AIIMS Apex Trauma Center
      }
      if (targetNode.id === "delhi_traffic_hub" && this.interventions.ups) {
        if (stepNumber <= 2) {
          this.nodeStates.set(targetNode.id, {
            state: "degraded",
            hop: stepNumber,
            reason: "Protected by 12h Industrial Battery UPS & Ring Road Redundancy",
            stepFailed: stepNumber
          });
          return;
        }
      }
      if (targetNode.id === "wazirabad_wtp" && this.interventions.dieselPump) {
        this.nodeStates.set(targetNode.id, {
          state: "degraded",
          hop: stepNumber,
          reason: "Continuous Pumping via DJB Auxiliary Diesel Turbine",
          stepFailed: stepNumber
        });
        return;
      }

      const sourceHop = Math.max(...incomingEdges.map(e => this.nodeStates.get(e.source).hop));
      const newHop = sourceHop + 1;
      const hasGeneratorBackup = targetNode.backupSystem.includes("Diesel") || targetNode.backupSystem.includes("UPS") || targetNode.backupSystem.includes("BESS");

      if (hasGeneratorBackup && stepNumber === 1 && targetNode.id === "aiims_trauma") {
        newlyAffected.push({
          id: targetNode.id,
          name: targetNode.name,
          state: "degraded",
          hop: newHop,
          reason: "Grid Power Lost. Active Emergency Diesel Generators (Dual 2000 kVA, 6h reserve).",
          step: stepNumber
        });
      } else if (hasGeneratorBackup && stepNumber === 1 && targetNode.id === "cp_telecom_exchange") {
        newlyAffected.push({
          id: targetNode.id,
          name: targetNode.name,
          state: "degraded",
          hop: newHop,
          reason: "Switched to MTNL DC Battery Array Standby (3h rating).",
          step: stepNumber
        });
      } else if (criticalFeedFailed || failedFeedCount >= 1) {
        newlyAffected.push({
          id: targetNode.id,
          name: targetNode.name,
          state: "failed",
          hop: newHop,
          reason: `Cascading Loss: Lost critical dependency feeds from upstream infrastructure.`,
          step: stepNumber
        });
      }
    });

    newlyAffected.forEach(item => {
      this.nodeStates.set(item.id, {
        state: item.state,
        hop: item.hop,
        reason: item.reason,
        stepFailed: item.step
      });

      this.eventLog.push({
        step: item.step,
        nodeId: item.id,
        nodeName: item.name,
        state: item.state,
        message: `DELHI CASCADE (Hop ${item.hop}): [${item.name}] shifted to ${item.state.toUpperCase()} - ${item.reason}`
      });
    });
  }

  stepForward() {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
      this.propagateStep(this.currentStep);
      return true;
    }
    return false;
  }

  stepBackward() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.recomputeSimulation();
      return true;
    }
    return false;
  }

  togglePlay(forceState = null) {
    this.isPlaying = forceState !== null ? forceState : !this.isPlaying;
    if (this.isPlaying) {
      if (this.currentStep >= this.maxSteps) {
        this.currentStep = 0;
        this.recomputeSimulation();
      }
      this.playTimer = setInterval(() => {
        const canStep = this.stepForward();
        updateUI();
        if (!canStep) {
          this.togglePlay(false);
          updateUI();
        }
      }, this.playIntervalMs);
    } else {
      if (this.playTimer) {
        clearInterval(this.playTimer);
        this.playTimer = null;
      }
    }
  }

  calculateCriticalityRanking() {
    const results = [];
    this.graph.nodes.forEach(testNode => {
      const tempStates = new Map();
      this.graph.nodes.forEach(n => tempStates.set(n.id, { state: "normal", hop: -1 }));
      tempStates.set(testNode.id, { state: "failed", hop: 0 });

      for (let s = 1; s <= 4; s++) {
        this.graph.nodes.forEach(target => {
          if (tempStates.get(target.id).state === "failed") return;
          const incoming = this.graph.edges.filter(e => e.target === target.id);
          if (incoming.some(e => tempStates.get(e.source).state === "failed" && e.critical)) {
            tempStates.set(target.id, { state: "failed", hop: s });
          }
        });
      }

      let totalFailed = 0;
      let populationLost = 0;
      let lifelinesLost = 0;
      let maxHop = 0;

      tempStates.forEach((val, nId) => {
        if (val.state === "failed") {
          totalFailed++;
          const n = this.graph.nodes.find(x => x.id === nId);
          if (n) {
            populationLost += n.population;
            if (n.isLifeline) lifelinesLost++;
          }
          if (val.hop > maxHop) maxHop = val.hop;
        }
      });

      const score = Math.min(100, Math.round((totalFailed * 5) + (lifelinesLost * 12) + (populationLost / 18000)));

      results.push({
        nodeId: testNode.id,
        name: testNode.name,
        sector: testNode.sector,
        totalFailed,
        populationLost,
        lifelinesLost,
        maxHop,
        score
      });
    });

    results.sort((a, b) => b.score - a.score);
    this.criticalityLeaderboard = results;
  }

  compareNodes(nodeIdA, nodeIdB) {
    const dataA = this.criticalityLeaderboard.find(x => x.nodeId === nodeIdA) || this.criticalityLeaderboard[0];
    const dataB = this.criticalityLeaderboard.find(x => x.nodeId === nodeIdB) || this.criticalityLeaderboard[1];
    return { nodeA: dataA, nodeB: dataB };
  }

  getLiveMetrics() {
    let failedCount = 0;
    let degradedCount = 0;
    let populationImpacted = 0;
    let lifelinesSevered = 0;
    let maxHop = 0;

    this.nodeStates.forEach((stateObj, nodeId) => {
      const n = this.graph.nodes.find(x => x.id === nodeId);
      if (stateObj.state === "failed") {
        failedCount++;
        if (n) {
          populationImpacted += n.population;
          if (n.isLifeline) lifelinesSevered++;
        }
        if (stateObj.hop > maxHop) maxHop = stateObj.hop;
      } else if (stateObj.state === "degraded") {
        degradedCount++;
        if (n) {
          populationImpacted += Math.round(n.population * 0.4);
          if (n.isLifeline) lifelinesSevered += 0.5;
        }
        if (stateObj.hop > maxHop) maxHop = stateObj.hop;
      }
    });

    const totalNodes = this.graph.nodes.length;
    const compromisedCount = failedCount + degradedCount;
    const compromisedPct = Math.round((compromisedCount / totalNodes) * 100);

    return {
      totalNodes,
      failedCount,
      degradedCount,
      compromisedCount,
      compromisedPct,
      populationImpacted,
      lifelinesSevered: Math.min(3, Math.round(lifelinesSevered)),
      maxHop: this.failedNodes.size === 0 ? 0 : maxHop
    };
  }
}

// 3. SOUND SYNTHESIZER
class SoundManager {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playAlert() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch (e) {}
  }

  playCascadeChime() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.25);
      });
    } catch (e) {}
  }
}

// 4. GRAPH RENDERER WITH DELHI STYLING & GRADIENTS
class GraphRenderer {
  constructor(canvas, graph, engine, sound) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.graph = graph;
    this.engine = engine;
    this.sound = sound;

    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.isDraggingCanvas = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    this.hoveredNode = null;
    this.draggedNode = null;
    this.sectorFilter = "all";
    this.physicsActive = true;

    this.particles = [];
    this.initParticles();
    this.pulsePhase = 0;

    this.initEventListeners();
    this.resizeCanvas();
    this.centerGraph();
    this.startLoop();
  }

  resizeCanvas() {
    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  centerGraph() {
    if (this.graph.nodes.length === 0) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    this.graph.nodes.forEach(n => {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });

    const graphW = maxX - minX || 600;
    const graphH = maxY - minY || 400;
    const padding = 110;

    const scaleX = (this.width - padding * 2) / graphW;
    const scaleY = (this.height - padding * 2) / graphH;
    this.zoom = Math.min(1.25, Math.max(0.7, Math.min(scaleX, scaleY)));

    const graphCenterX = (minX + maxX) / 2;
    const graphCenterY = (minY + maxY) / 2;

    this.panX = (this.width / 2) - (graphCenterX * this.zoom);
    this.panY = (this.height / 2) - (graphCenterY * this.zoom);
  }

  initParticles() {
    this.particles = [];
    this.graph.edges.forEach((edge, idx) => {
      this.particles.push({ edgeIdx: idx, progress: Math.random(), speed: 0.006 + Math.random() * 0.005 });
      this.particles.push({ edgeIdx: idx, progress: Math.random(), speed: 0.006 + Math.random() * 0.005 });
    });
  }

  initEventListeners() {
    window.addEventListener("resize", () => this.resizeCanvas());

    this.canvas.addEventListener("mousedown", (e) => {
      const mouse = this.getCanvasCoords(e);
      const clicked = this.findNodeAt(mouse.x, mouse.y);
      if (clicked) {
        this.draggedNode = clicked;
        this.draggedNode.isPinned = true;
      } else {
        this.isDraggingCanvas = true;
        this.dragStartX = e.clientX - this.panX;
        this.dragStartY = e.clientY - this.panY;
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const mouse = this.getCanvasCoords(e);
      if (this.draggedNode) {
        this.draggedNode.x = mouse.x;
        this.draggedNode.y = mouse.y;
      } else if (this.isDraggingCanvas) {
        this.panX = e.clientX - this.dragStartX;
        this.panY = e.clientY - this.dragStartY;
      } else {
        const hovered = this.findNodeAt(mouse.x, mouse.y);
        if (hovered !== this.hoveredNode) {
          this.hoveredNode = hovered;
          this.updateTooltip(e, hovered);
          this.canvas.style.cursor = hovered ? "pointer" : "grab";
        } else if (hovered) {
          this.updateTooltipPos(e);
        }
      }
    });

    window.addEventListener("mouseup", () => {
      if (this.draggedNode) {
        this.draggedNode.isPinned = false;
        this.draggedNode = null;
      }
      this.isDraggingCanvas = false;
    });

    this.canvas.addEventListener("click", (e) => {
      const mouse = this.getCanvasCoords(e);
      const clicked = this.findNodeAt(mouse.x, mouse.y);
      if (clicked) {
        this.sound.playClick();
        this.engine.toggleNodeInitialFailure(clicked.id);
        updateUI();
      }
    });

    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      const mouse = this.getCanvasCoords(e);
      const newZoom = Math.min(2.5, Math.max(0.4, this.zoom * zoomFactor));
      this.panX = mouse.screenX - (mouse.screenX - this.panX) * (newZoom / this.zoom);
      this.panY = mouse.screenY - (mouse.screenY - this.panY) * (newZoom / this.zoom);
      this.zoom = newZoom;
    }, { passive: false });
  }

  getCanvasCoords(e) {
    const rect = this.canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    return {
      x: (screenX - this.panX) / this.zoom,
      y: (screenY - this.panY) / this.zoom,
      screenX,
      screenY
    };
  }

  findNodeAt(x, y) {
    const radius = 28;
    for (let i = this.graph.nodes.length - 1; i >= 0; i--) {
      const node = this.graph.nodes[i];
      if (this.sectorFilter !== "all" && node.sector !== this.sectorFilter) continue;
      const dx = node.x - x;
      const dy = node.y - y;
      if (dx * dx + dy * dy <= radius * radius) return node;
    }
    return null;
  }

  updateTooltip(e, node) {
    const tooltip = document.getElementById("graph-tooltip");
    if (!node) {
      tooltip.classList.add("opacity-0");
      return;
    }

    const stateObj = this.engine.nodeStates.get(node.id) || { state: "normal", reason: "Operational" };
    const spofData = this.engine.criticalityLeaderboard.find(x => x.nodeId === node.id);

    document.getElementById("tooltip-name").textContent = node.name;
    document.getElementById("tooltip-desc").textContent = node.desc;
    document.getElementById("tooltip-sector").textContent = node.category;
    document.getElementById("tooltip-sector").className = `sector-badge sector-${node.sector}`;
    
    const statusEl = document.getElementById("tooltip-status");
    if (stateObj.state === "failed") {
      statusEl.textContent = "CRITICAL FAILURE";
      statusEl.className = "px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-500/25 text-red-300 border border-red-500/50";
    } else if (stateObj.state === "degraded") {
      statusEl.textContent = "BACKUP RUNNING";
      statusEl.className = "px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/25 text-amber-300 border border-amber-500/50";
    } else {
      statusEl.textContent = "NORMAL FEED";
      statusEl.className = "px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/25 text-emerald-300 border border-emerald-500/50";
    }

    document.getElementById("tooltip-criticality").textContent = `${spofData ? spofData.score : 50} / 100`;
    const dependentsCount = this.graph.edges.filter(e => e.source === node.id).length;
    document.getElementById("tooltip-dependents").textContent = `${dependentsCount} downstream assets`;
    document.getElementById("tooltip-backup").textContent = node.backupSystem;

    this.updateTooltipPos(e);
    tooltip.classList.remove("opacity-0");
  }

  updateTooltipPos(e) {
    const tooltip = document.getElementById("graph-tooltip");
    const containerRect = this.canvas.parentElement.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  applyPhysics() {
    if (!this.physicsActive) return;

    const nodes = this.graph.nodes;
    const edges = this.graph.edges;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const distSq = dx * dx + dy * dy || 1;
        const dist = Math.sqrt(distSq);

        if (dist < 230) {
          const force = (230 - dist) / dist * 0.08;
          if (!n1.isPinned) { n1.x -= dx * force; n1.y -= dy * force; }
          if (!n2.isPinned) { n2.x += dx * force; n2.y += dy * force; }
        }
      }
    }

    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source);
      const target = nodes.find(n => n.id === edge.target);
      if (!source || !target) return;

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const desiredDist = 185;
      const springForce = (dist - desiredDist) * 0.003;

      if (!source.isPinned) { source.x += (dx / dist) * springForce; source.y += (dy / dist) * springForce; }
      if (!target.isPinned) { target.x -= (dx / dist) * springForce; target.y -= (dy / dist) * springForce; }
    });
  }

  startLoop() {
    const render = () => {
      this.pulsePhase += 0.045;
      this.applyPhysics();
      this.draw();
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    ctx.translate(this.panX, this.panY);
    ctx.scale(this.zoom, this.zoom);

    this.drawEdges(ctx);
    this.drawParticles(ctx);
    this.drawNodes(ctx);

    ctx.restore();
  }

  drawEdges(ctx) {
    this.graph.edges.forEach(edge => {
      const source = this.graph.nodes.find(n => n.id === edge.source);
      const target = this.graph.nodes.find(n => n.id === edge.target);
      if (!source || !target) return;

      const sourceState = this.engine.nodeStates.get(source.id);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);

      const edgeGrad = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
      if (sourceState.state === "failed") {
        edgeGrad.addColorStop(0, "rgba(239, 68, 68, 0.75)");
        edgeGrad.addColorStop(1, "rgba(239, 68, 68, 0.2)");
        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = 2.2;
        ctx.setLineDash([6, 6]);
      } else if (sourceState.state === "degraded") {
        edgeGrad.addColorStop(0, "rgba(245, 158, 11, 0.9)");
        edgeGrad.addColorStop(1, "rgba(245, 158, 11, 0.3)");
        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = 2.8;
        ctx.setLineDash([8, 4]);
      } else {
        if (edge.critical) {
          edgeGrad.addColorStop(0, "rgba(99, 102, 241, 0.85)");
          edgeGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.75)");
          edgeGrad.addColorStop(1, "rgba(6, 182, 212, 0.6)");
        } else {
          edgeGrad.addColorStop(0, "rgba(255, 255, 255, 0.35)");
          edgeGrad.addColorStop(1, "rgba(255, 255, 255, 0.12)");
        }
        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = edge.critical ? 2.5 : 1.5;
        ctx.setLineDash([]);
      }
      ctx.stroke();

      const angle = Math.atan2(target.y - source.y, target.x - source.x);
      const arrowDist = 28;
      const tipX = target.x - Math.cos(angle) * arrowDist;
      const tipY = target.y - Math.sin(angle) * arrowDist;

      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(tipX - 9 * Math.cos(angle - Math.PI / 6.5), tipY - 9 * Math.sin(angle - Math.PI / 6.5));
      ctx.lineTo(tipX - 9 * Math.cos(angle + Math.PI / 6.5), tipY - 9 * Math.sin(angle + Math.PI / 6.5));
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();

      ctx.restore();
    });
  }

  drawParticles(ctx) {
    this.particles.forEach(p => {
      const edge = this.graph.edges[p.edgeIdx];
      if (!edge) return;
      const source = this.graph.nodes.find(n => n.id === edge.source);
      const target = this.graph.nodes.find(n => n.id === edge.target);
      if (!source || !target) return;

      const sourceState = this.engine.nodeStates.get(source.id);
      if (sourceState.state === "failed") return;

      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;

      const curX = source.x + (target.x - source.x) * p.progress;
      const curY = source.y + (target.y - source.y) * p.progress;

      ctx.save();
      ctx.beginPath();
      ctx.arc(curX, curY, sourceState.state === "degraded" ? 3 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = sourceState.state === "degraded" ? "#f59e0b" : "#38bdf8";
      ctx.shadowColor = sourceState.state === "degraded" ? "#f59e0b" : "#00f2fe";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    });
  }

  drawNodes(ctx) {
    this.graph.nodes.forEach(node => {
      if (this.sectorFilter !== "all" && node.sector !== this.sectorFilter) return;

      const stateObj = this.engine.nodeStates.get(node.id) || { state: "normal" };
      const isInitialFailed = this.engine.failedNodes.has(node.id);
      const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
      const radius = isHovered ? 26 : 22;

      ctx.save();

      // Pulsing alert rings for failed/degraded nodes
      if (stateObj.state === "failed") {
        const pulseSize = (Math.sin(this.pulsePhase * 1.2) + 1) * 7 + radius;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = isInitialFailed ? "rgba(239, 68, 68, 0.85)" : "rgba(239, 68, 68, 0.5)";
        ctx.lineWidth = isInitialFailed ? 3 : 2;
        ctx.stroke();

        if (isInitialFailed) {
          const ripple = ((this.pulsePhase * 9) % 36) + radius;
          ctx.beginPath();
          ctx.arc(node.x, node.y, ripple, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(239, 68, 68, ${Math.max(0, 0.7 - (ripple - radius) / 36)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      } else if (stateObj.state === "degraded") {
        const pulseSize = (Math.sin(this.pulsePhase) + 1) * 5 + radius;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(245, 158, 11, 0.7)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 3D Luminous Radial Gradient Orb Fill
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

      const orbGrad = ctx.createRadialGradient(
        node.x - radius * 0.35, node.y - radius * 0.35, radius * 0.05,
        node.x, node.y, radius
      );

      let ringColor = "#6366f1";
      let glowColor = "transparent";

      if (stateObj.state === "failed") {
        orbGrad.addColorStop(0, "#fca5a5");
        orbGrad.addColorStop(0.35, isInitialFailed ? "#ef4444" : "#dc2626");
        orbGrad.addColorStop(1, "#450a0a");
        ringColor = "#ef4444";
        glowColor = "rgba(239, 68, 68, 0.95)";
      } else if (stateObj.state === "degraded") {
        orbGrad.addColorStop(0, "#fef08a");
        orbGrad.addColorStop(0.35, "#f59e0b");
        orbGrad.addColorStop(1, "#78350f");
        ringColor = "#f59e0b";
        glowColor = "rgba(245, 158, 11, 0.95)";
      } else {
        switch (node.sector) {
          case "power":
            orbGrad.addColorStop(0, "#fef08a");
            orbGrad.addColorStop(0.4, "#eab308");
            orbGrad.addColorStop(1, "#422006");
            ringColor = "#facc15";
            glowColor = "#eab308";
            break;
          case "water":
            orbGrad.addColorStop(0, "#a5f3fc");
            orbGrad.addColorStop(0.4, "#06b6d4");
            orbGrad.addColorStop(1, "#083344");
            ringColor = "#22d3ee";
            glowColor = "#06b6d4";
            break;
          case "transit":
            orbGrad.addColorStop(0, "#bfdbfe");
            orbGrad.addColorStop(0.4, "#3b82f6");
            orbGrad.addColorStop(1, "#172554");
            ringColor = "#60a5fa";
            glowColor = "#3b82f6";
            break;
          case "health":
            orbGrad.addColorStop(0, "#fbcfe8");
            orbGrad.addColorStop(0.4, "#ec4899");
            orbGrad.addColorStop(1, "#500724");
            ringColor = "#f43f5e";
            glowColor = "#ec4899";
            break;
          case "comms":
            orbGrad.addColorStop(0, "#e9d5ff");
            orbGrad.addColorStop(0.4, "#a855f7");
            orbGrad.addColorStop(1, "#3b0764");
            ringColor = "#c084fc";
            glowColor = "#a855f7";
            break;
          default:
            orbGrad.addColorStop(0, "#a7f3d0");
            orbGrad.addColorStop(0.4, "#10b981");
            orbGrad.addColorStop(1, "#022c22");
            ringColor = "#34d399";
            glowColor = "#10b981";
        }
      }

      ctx.fillStyle = orbGrad;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = isHovered ? 24 : 14;
      ctx.fill();

      // Node Border Ring
      ctx.lineWidth = node.isLifeline ? 3.5 : 2.5;
      ctx.strokeStyle = ringColor;
      ctx.stroke();

      // Center Icon
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let symbol = "●";
      switch (node.sector) {
        case "power": symbol = "⚡"; break;
        case "water": symbol = "💧"; break;
        case "transit": symbol = "🚗"; break;
        case "health": symbol = "🏥"; break;
        case "comms": symbol = "📡"; break;
      }
      if (stateObj.state === "failed") symbol = "✕";
      ctx.fillText(symbol, node.x, node.y);

      // --- HIGH CONTRAST LABEL PILL ---
      const labelText = node.name;
      ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
      const textMetrics = ctx.measureText(labelText);
      const pillWidth = textMetrics.width + 16;
      const pillHeight = 20;
      const pillX = node.x - pillWidth / 2;
      const pillY = node.y + radius + 8;

      const pillGrad = ctx.createLinearGradient(pillX, pillY, pillX + pillWidth, pillY + pillHeight);
      pillGrad.addColorStop(0, "rgba(24, 32, 56, 0.95)");
      pillGrad.addColorStop(1, "rgba(10, 14, 26, 0.95)");
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 6);
      ctx.fillStyle = pillGrad;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = stateObj.state === "failed" ? "rgba(239, 68, 68, 0.7)" : (stateObj.state === "degraded" ? "rgba(245, 158, 11, 0.7)" : "rgba(255, 255, 255, 0.22)");
      ctx.stroke();

      ctx.fillStyle = stateObj.state === "failed" ? "#fca5a5" : (stateObj.state === "degraded" ? "#fde68a" : "#f8fafc");
      ctx.textBaseline = "middle";
      ctx.fillText(labelText, node.x, pillY + pillHeight / 2);

      ctx.restore();
    });
  }
}

// 5. GLOBAL INITIALIZATION & UI DATA BINDINGS
let engine, renderer, soundManager;

document.addEventListener("DOMContentLoaded", () => {
  engine = new SimulationEngine(INFRASTRUCTURE_GRAPH);
  soundManager = new SoundManager();
  
  const canvas = document.getElementById("graph-canvas");
  renderer = new GraphRenderer(canvas, INFRASTRUCTURE_GRAPH, engine, soundManager);

  setupHeaderEvents();
  setupTimelineEvents();
  setupViewportEvents();
  setupSidebarTabs();
  setupInterventions();
  setupComparatorEvents();
  setupReportModal();
  setupGuidedDemo();
  setupOnboardingDismiss();

  renderAssetList();
  renderLeaderboard();
  populateComparatorSelects();
  updateUI();

  if (window.lucide) window.lucide.createIcons();
});

function updateUI() {
  const metrics = engine.getLiveMetrics();

  const threatPill = document.getElementById("threat-pill");
  const threatDot = document.getElementById("threat-dot");
  const threatText = document.getElementById("threat-text");

  if (metrics.compromisedCount === 0) {
    threatPill.className = "hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-md shadow-emerald-500/10 shrink-0 whitespace-nowrap";
    threatDot.className = "w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-indicator pulse-green shrink-0";
    threatText.textContent = "Delhi Grid 100% Operational";
  } else if (metrics.compromisedPct < 35) {
    threatPill.className = "hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-md shadow-amber-500/10 shrink-0 whitespace-nowrap";
    threatDot.className = "w-2.5 h-2.5 rounded-full bg-amber-400 pulse-indicator pulse-amber shrink-0";
    threatText.textContent = `DDMA Advisory (${metrics.compromisedCount} Assets Affected)`;
  } else {
    threatPill.className = "hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 text-xs font-bold shadow-lg shadow-red-500/20 shrink-0 whitespace-nowrap";
    threatDot.className = "w-2.5 h-2.5 rounded-full bg-red-400 pulse-indicator pulse-red shrink-0";
    threatText.textContent = `Delhi Emergency Alert (${metrics.compromisedPct}% Compromised)`;
  }

  document.getElementById("metric-compromised-pct").textContent = `${metrics.compromisedPct}%`;
  document.getElementById("metric-compromised-pct").className = `font-mono-num text-3xl font-black ${
    metrics.compromisedPct === 0 ? 'text-emerald-400' : (metrics.compromisedPct < 40 ? 'text-amber-400' : 'text-red-400')
  }`;
  document.getElementById("metric-compromised-count").textContent = `(${metrics.compromisedCount}/16 assets)`;
  
  const bar = document.getElementById("metric-compromised-bar");
  bar.style.width = `${metrics.compromisedPct}%`;
  bar.className = `h-full transition-all duration-500 ${
    metrics.compromisedPct === 0 ? 'bg-emerald-500' : (metrics.compromisedPct < 40 ? 'bg-amber-500' : 'bg-red-500')
  }`;

  document.getElementById("metric-population").textContent = metrics.populationImpacted.toLocaleString();
  document.getElementById("metric-population-sub").textContent = metrics.populationImpacted > 0 
    ? `${((metrics.populationImpacted / 1200000) * 100).toFixed(1)}% of monitored NCR populace` 
    : "All NCT zones fully energized";

  document.getElementById("metric-lifelines").textContent = `${metrics.lifelinesSevered} / 3`;
  document.getElementById("metric-lifelines").className = `font-mono-num text-3xl font-black ${
    metrics.lifelinesSevered === 0 ? 'text-emerald-400' : (metrics.lifelinesSevered < 2 ? 'text-amber-400' : 'text-red-400')
  }`;
  document.getElementById("metric-lifelines-sub").textContent = metrics.lifelinesSevered > 0
    ? "AIIMS Trauma or 112 Dispatch compromised"
    : "AIIMS Apex Trauma & 112 operational";

  document.getElementById("metric-hops").textContent = metrics.maxHop;
  document.getElementById("metric-blast-radius").textContent = `Reach: ${(metrics.maxHop * 6.5).toFixed(1)} km NCR radius`;

  document.getElementById("timeline-step-badge").textContent = `${engine.currentStep} / ${engine.maxSteps}`;
  document.getElementById("step-prev-btn").disabled = engine.currentStep === 0;
  document.getElementById("step-next-btn").disabled = engine.currentStep >= engine.maxSteps || engine.failedNodes.size === 0;

  renderEventLog();
  renderAssetList();
  updateComparatorDisplay();
}

function renderEventLog() {
  const container = document.getElementById("cascade-event-log");
  const badge = document.getElementById("log-count-badge");
  badge.textContent = `${engine.eventLog.length} events`;

  if (engine.eventLog.length === 0) {
    container.innerHTML = `
      <div class="text-slate-400 text-xs italic py-4 text-center bg-slate-900/40 rounded-xl border border-dashed border-white/10">
        💡 Delhi grid normal. Click any node in the graph or select a Delhi disaster scenario above to simulate cascading failure.
      </div>`;
    return;
  }

  container.innerHTML = engine.eventLog.map(ev => {
    const isPrimary = ev.step === 0;
    return `
      <div class="p-2.5 rounded-xl border ${
        isPrimary 
          ? 'bg-red-950/50 border-red-500/50 text-red-200' 
          : (ev.state === 'degraded' ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-red-950/30 border-red-500/30 text-slate-200')
      } animate-fade-in text-xs leading-relaxed shadow">
        <div class="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
          <span class="font-bold uppercase tracking-wider ${isPrimary ? 'text-red-400' : 'text-cyan-400'}">
            ${isPrimary ? '🔥 Primary Delhi Incident' : `⚡ Domino Wave ${ev.step}`}
          </span>
          <span class="bg-black/40 px-2 py-0.5 rounded text-slate-300">t + ${ev.step * 15}m</span>
        </div>
        <p class="font-medium">${ev.message}</p>
      </div>`;
  }).join("");
}

function renderAssetList() {
  const container = document.getElementById("asset-status-list");
  if (!container) return;

  container.innerHTML = INFRASTRUCTURE_GRAPH.nodes.map(node => {
    const stateObj = engine.nodeStates.get(node.id) || { state: "normal", reason: "Operational" };
    let statusClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    let statusLabel = "Normal";

    if (stateObj.state === "failed") {
      statusClass = "bg-red-500/25 text-red-300 border-red-500/50";
      statusLabel = "Offline";
    } else if (stateObj.state === "degraded") {
      statusClass = "bg-amber-500/25 text-amber-300 border-amber-500/50";
      statusLabel = "Backup";
    }

    return `
      <div class="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all text-xs">
        <div class="flex items-center gap-2 min-w-0 pr-2">
          <span class="w-2.5 h-2.5 rounded-full ${stateObj.state === 'failed' ? 'bg-red-400' : (stateObj.state === 'degraded' ? 'bg-amber-400' : 'bg-emerald-400')}"></span>
          <span class="font-semibold text-slate-100 truncate">${node.name}</span>
        </div>
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border shrink-0 ${statusClass}">
          ${statusLabel}
        </span>
      </div>`;
  }).join("");
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard-container");
  if (!container) return;

  container.innerHTML = engine.criticalityLeaderboard.map((item, idx) => {
    const medals = ["🥇", "🥈", "🥉"];
    const medal = idx < 3 ? medals[idx] : `#${idx + 1}`;
    const isTop3 = idx < 3;

    return `
      <div class="grid grid-cols-12 items-center p-2.5 rounded-xl border ${
        isTop3 ? 'bg-indigo-950/30 border-indigo-500/40 glow-card-indigo' : 'bg-slate-900/50 border-white/5'
      } text-xs hover:border-indigo-500/60 transition-all">
        <span class="col-span-1 font-bold text-sm text-center">${medal}</span>
        <div class="col-span-5 pr-2">
          <span class="font-bold text-slate-100 block truncate">${item.name}</span>
          <span class="text-[10px] text-slate-400 capitalize font-medium">${item.sector} sector</span>
        </div>
        <div class="col-span-3 text-center">
          <span class="font-mono-num font-black text-xs ${item.score > 60 ? 'text-red-400' : 'text-amber-400'}">${item.score} / 100</span>
          <span class="text-[10px] text-slate-400 block font-medium">${item.totalFailed} nodes lost</span>
        </div>
        <div class="col-span-3 text-right">
          <button onclick="simulateNodeFromLeaderboard('${item.nodeId}')" class="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shadow transition-all">
            Simulate
          </button>
        </div>
      </div>`;
  }).join("");
}

window.simulateNodeFromLeaderboard = function(nodeId) {
  soundManager.playAlert();
  engine.resetSimulation();
  engine.failedNodes.add(nodeId);
  engine.recomputeSimulation();
  updateUI();
  document.querySelector('[data-tab="tab-live"]').click();
};

function populateComparatorSelects() {
  const selectA = document.getElementById("compare-select-a");
  const selectB = document.getElementById("compare-select-b");
  if (!selectA || !selectB) return;

  const options = INFRASTRUCTURE_GRAPH.nodes.map(n => `<option value="${n.id}">${n.name}</option>`).join("");
  selectA.innerHTML = options;
  selectB.innerHTML = options;

  selectA.value = "sub_bawana";
  selectB.value = "signature_bridge";
  updateComparatorDisplay();
}

function updateComparatorDisplay() {
  const selectA = document.getElementById("compare-select-a");
  const selectB = document.getElementById("compare-select-b");
  if (!selectA || !selectB) return;

  const comp = engine.compareNodes(selectA.value, selectB.value);
  const nodeA = comp.nodeA;
  const nodeB = comp.nodeB;

  const resultsContainer = document.getElementById("comparison-results");
  resultsContainer.innerHTML = `
    <div class="grid grid-cols-2 gap-3 text-xs">
      <div class="glass-panel p-3.5 border-indigo-500/40 glow-card-indigo bg-gradient-to-br from-indigo-950/30 to-slate-900/80">
        <span class="text-[10px] font-extrabold text-indigo-300 uppercase tracking-wide">Scenario A</span>
        <h4 class="font-extrabold text-white text-xs mt-0.5 truncate">${nodeA.name}</h4>
        
        <div class="mt-3 space-y-2">
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">Delhi Vulnerability Score:</span>
            <span class="font-mono-num text-xl font-black text-indigo-300">${nodeA.score} / 100</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">NCR Assets Disrupted:</span>
            <span class="font-mono-num font-bold text-slate-200">${nodeA.totalFailed} / 16</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">Population Cut Off:</span>
            <span class="font-mono-num font-bold text-slate-200">${nodeA.populationLost.toLocaleString()}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">Lifelines Severed:</span>
            <span class="font-mono-num font-bold text-red-400">${nodeA.lifelinesLost} critical</span>
          </div>
        </div>
      </div>

      <div class="glass-panel p-3.5 border-pink-500/40 glow-card-pink bg-gradient-to-br from-pink-950/30 to-slate-900/80">
        <span class="text-[10px] font-extrabold text-pink-300 uppercase tracking-wide">Scenario B</span>
        <h4 class="font-extrabold text-white text-xs mt-0.5 truncate">${nodeB.name}</h4>
        
        <div class="mt-3 space-y-2">
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">Delhi Vulnerability Score:</span>
            <span class="font-mono-num text-xl font-black text-pink-300">${nodeB.score} / 100</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">NCR Assets Disrupted:</span>
            <span class="font-mono-num font-bold text-slate-200">${nodeB.totalFailed} / 16</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">Population Cut Off:</span>
            <span class="font-mono-num font-bold text-slate-200">${nodeB.populationLost.toLocaleString()}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">Lifelines Severed:</span>
            <span class="font-mono-num font-bold text-red-400">${nodeB.lifelinesLost} critical</span>
          </div>
        </div>
      </div>
    </div>`;

  const verdictContainer = document.getElementById("comparison-verdict");
  const worseNode = nodeA.score >= nodeB.score ? nodeA : nodeB;
  const milderNode = nodeA.score < nodeB.score ? nodeA : nodeB;

  verdictContainer.innerHTML = `
    <h4 class="text-xs font-bold text-indigo-300 flex items-center gap-1.5 mb-2">
      <i data-lucide="scale" class="w-4 h-4"></i> Comparative Delhi Impact Verdict
    </h4>
    <p class="text-slate-200 text-xs leading-relaxed">
      Failure of <strong class="text-white font-bold">${worseNode.name}</strong> presents a significantly higher systemic hazard for NCT of Delhi (Score: ${worseNode.score} vs ${milderNode.score}). It triggers <strong class="text-red-300">+${Math.abs(nodeA.totalFailed - nodeB.totalFailed)} more downstream disruptions</strong> and cuts off <strong class="text-cyan-300">${Math.abs(nodeA.populationLost - nodeB.populationLost).toLocaleString()} more citizens</strong>.
    </p>
    <div class="mt-3 pt-2 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
      <span>Bottleneck: <strong class="text-slate-200">${worseNode.sector.toUpperCase()} ARTERY</strong></span>
      <button onclick="simulateNodeFromLeaderboard('${worseNode.nodeId}')" class="px-2.5 py-1 rounded bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold transition-all">
        Simulate Worst Delhi Case
      </button>
    </div>`;

  if (window.lucide) window.lucide.createIcons();
}

function setupComparatorEvents() {
  document.getElementById("compare-select-a").addEventListener("change", updateComparatorDisplay);
  document.getElementById("compare-select-b").addEventListener("change", updateComparatorDisplay);
}

function setupHeaderEvents() {
  document.getElementById("disaster-select").addEventListener("change", (e) => {
    const preset = e.target.value;
    if (preset !== "none") {
      soundManager.playAlert();
      engine.setPresetDisaster(preset);
      updateUI();
    }
  });

  document.getElementById("reset-all-btn").addEventListener("click", () => {
    soundManager.playClick();
    engine.resetSimulation();
    document.getElementById("disaster-select").value = "none";
    updateUI();
  });

  document.getElementById("audio-toggle-btn").addEventListener("click", () => {
    soundManager.enabled = !soundManager.enabled;
    const icon = document.getElementById("audio-icon");
    if (soundManager.enabled) {
      icon.setAttribute("data-lucide", "volume-2");
      soundManager.playClick();
    } else {
      icon.setAttribute("data-lucide", "volume-x");
    }
    if (window.lucide) window.lucide.createIcons();
  });

  document.querySelectorAll(".sector-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sector-filter-btn").forEach(b => {
        b.classList.remove("active", "bg-indigo-600", "text-white");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("active", "bg-indigo-600", "text-white");
      btn.classList.remove("text-slate-300");
      renderer.sectorFilter = btn.dataset.sector;
      soundManager.playClick();
    });
  });
}

function setupTimelineEvents() {
  const playBtn = document.getElementById("play-pause-btn");
  const playIcon = document.getElementById("play-icon");
  const playText = document.getElementById("play-text");

  playBtn.addEventListener("click", () => {
    soundManager.playClick();
    engine.togglePlay();
    if (engine.isPlaying) {
      playIcon.setAttribute("data-lucide", "pause");
      playText.textContent = "Pause";
      playBtn.className = "flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/40 transition-all btn-action";
    } else {
      playIcon.setAttribute("data-lucide", "play");
      playText.textContent = "Auto-Propagate";
      playBtn.className = "flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/40 transition-all btn-action";
    }
    if (window.lucide) window.lucide.createIcons();
  });

  document.getElementById("step-next-btn").addEventListener("click", () => {
    soundManager.playAlert();
    engine.stepForward();
    updateUI();
  });

  document.getElementById("step-prev-btn").addEventListener("click", () => {
    soundManager.playClick();
    engine.stepBackward();
    updateUI();
  });

  document.getElementById("sim-speed-slider").addEventListener("input", (e) => {
    engine.playIntervalMs = parseInt(e.target.value, 10);
    if (engine.isPlaying) {
      engine.togglePlay(false);
      engine.togglePlay(true);
    }
  });
}

function setupViewportEvents() {
  document.getElementById("btn-zoom-in").addEventListener("click", () => {
    renderer.zoom = Math.min(2.5, renderer.zoom * 1.2);
    soundManager.playClick();
  });

  document.getElementById("btn-zoom-out").addEventListener("click", () => {
    renderer.zoom = Math.max(0.4, renderer.zoom * 0.8);
    soundManager.playClick();
  });

  document.getElementById("btn-fit-view").addEventListener("click", () => {
    renderer.centerGraph();
    soundManager.playClick();
  });

  document.getElementById("btn-pause-physics").addEventListener("click", () => {
    renderer.physicsActive = !renderer.physicsActive;
    const icon = document.getElementById("physics-icon");
    const label = document.getElementById("physics-label");
    if (renderer.physicsActive) {
      icon.setAttribute("data-lucide", "pause");
      label.textContent = "Freeze";
    } else {
      icon.setAttribute("data-lucide", "play");
      label.textContent = "Float";
    }
    if (window.lucide) window.lucide.createIcons();
  });
}

function setupSidebarTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("active", "text-indigo-400");
        b.classList.add("text-slate-400");
      });
      document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));

      btn.classList.add("active", "text-indigo-400");
      btn.classList.remove("text-slate-400");

      const targetId = btn.dataset.tab;
      document.getElementById(targetId).classList.remove("hidden");
      soundManager.playClick();
    });
  });
}

function setupInterventions() {
  const mg = document.getElementById("intervention-microgrid");
  const ups = document.getElementById("intervention-ups");
  const pump = document.getElementById("intervention-diesel-pump");

  function handleInterventionChange() {
    engine.setIntervention("microgrid", mg.checked);
    engine.setIntervention("ups", ups.checked);
    engine.setIntervention("dieselPump", pump.checked);

    const activeCount = (mg.checked ? 1 : 0) + (ups.checked ? 1 : 0) + (pump.checked ? 1 : 0);
    const summary = document.getElementById("interventions-active-summary");
    summary.textContent = `${activeCount} / 3 active interventions hardening Delhi NCT resilience.`;

    soundManager.playCascadeChime();
    updateUI();
  }

  mg.addEventListener("change", handleInterventionChange);
  ups.addEventListener("change", handleInterventionChange);
  pump.addEventListener("change", handleInterventionChange);
}

function setupOnboardingDismiss() {
  const dismissBtn = document.getElementById("dismiss-guide-btn");
  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      document.getElementById("onboarding-guide").style.display = "none";
      soundManager.playClick();
    });
  }
}

// 6. GUIDED INTERACTIVE TOUR (Judges 1-Click Demo)
function setupGuidedDemo() {
  const demoBtn = document.getElementById("guided-demo-btn");
  if (!demoBtn) return;

  demoBtn.addEventListener("click", () => {
    soundManager.playCascadeChime();
    engine.resetSimulation();
    document.getElementById("disaster-select").value = "preset-substation";
    engine.setPresetDisaster("preset-substation");
    updateUI();

    document.querySelector('[data-tab="tab-live"]').click();

    let step = 1;
    const interval = setInterval(() => {
      if (step <= 3) {
        soundManager.playAlert();
        engine.stepForward();
        updateUI();
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          document.querySelector('[data-tab="tab-interventions"]').click();
          const mg = document.getElementById("intervention-microgrid");
          mg.checked = true;
          engine.setIntervention("microgrid", true);
          soundManager.playCascadeChime();
          updateUI();
          document.getElementById("interventions-active-summary").textContent = "✨ AIIMS Microgrid Engaged: AIIMS Apex Trauma Center shielded from Delhi Transco grid collapse!";
        }, 1200);
      }
    }, 1400);
  });
}

function setupReportModal() {
  const modal = document.getElementById("report-modal");
  const openBtn = document.getElementById("export-report-btn");
  const closeBtn = document.getElementById("close-report-btn");
  const downloadBtn = document.getElementById("download-report-btn");

  openBtn.addEventListener("click", () => {
    generateReportContent();
    modal.classList.remove("hidden");
    soundManager.playClick();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  downloadBtn.addEventListener("click", () => {
    const text = document.getElementById("report-content").innerText;
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `delhi-cascading-failure-report-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

function generateReportContent() {
  const metrics = engine.getLiveMetrics();
  const dateStr = new Date().toISOString();
  const rootCauses = Array.from(engine.failedNodes).map(id => {
    const n = INFRASTRUCTURE_GRAPH.nodes.find(x => x.id === id);
    return n ? n.name : id;
  });

  const content = document.getElementById("report-content");
  content.innerHTML = `
========================================================================
DELHI DISASTER MANAGEMENT AUTHORITY (DDMA) & DTL
CRITICAL INFRASTRUCTURE RESILIENCE ASSESSMENT REPORT
Problem Statement ID: P05 (NCT of Delhi Disaster Resilience Model)
Generated: ${dateStr}
========================================================================

1. DELHI NCT DISASTER SUMMARY:
------------------------------------------------------------------------
- Root Incident Point(s)  : ${rootCauses.length ? rootCauses.join(", ") : "None (Baseline Normal Grid)"}
- Total Assets Compromised: ${metrics.compromisedCount} of ${metrics.totalNodes} (${metrics.compromisedPct}%)
- Population Cut Off     : ${metrics.populationImpacted.toLocaleString()} citizens across NCT districts
- Critical Lifelines Lost : ${metrics.lifelinesSevered} of 3 (AIIMS Apex Trauma / Delhi 112 PSAP / Wazirabad WTP)
- Max Cascade Reach      : Hop Distance ${metrics.maxHop} (~${(metrics.maxHop * 6.5).toFixed(1)} km physical radius across NCR)

2. SYSTEMIC VULNERABILITY RANKING (Top Single Points of Failure):
------------------------------------------------------------------------
${engine.criticalityLeaderboard.slice(0, 3).map((item, i) => 
  `  #${i+1} [${item.name}] - Score: ${item.score}/100 | Blast: ${item.totalFailed} nodes | Pop: ${item.populationLost.toLocaleString()}`
).join("\n")}

3. DETAILED EVENT CASCADE TRACE:
------------------------------------------------------------------------
${engine.eventLog.length ? engine.eventLog.map(e => `[t + ${e.step * 15}m] Step ${e.step}: ${e.message}`).join("\n") : "No cascading failures logged."}

4. DDMA & URBAN RESILIENCE RECOMMENDATIONS:
------------------------------------------------------------------------
1. Install dedicated Microgrid tie-line connecting IGI Clean Solar Reserve to AIIMS Apex Trauma Center.
2. Deploy 12h Industrial UPS battery backup across Delhi Traffic Police ITMS signal controllers along Ring Road.
3. Install high-volume auxiliary diesel pump bypass at Wazirabad Water Treatment Plant to withstand Yamuna flood conditions.
========================================================================`;
}
