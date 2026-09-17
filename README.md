# CascadePulse Delhi NCR // NCT Critical Infrastructure Resilience Simulator

> **Problem Statement ID**: P05  
> **Track**: Disaster Resilience & Critical Infrastructure (NCT of Delhi Focus)  
> **Jurisdiction**: Delhi Disaster Management Authority (DDMA) / Delhi Transco Limited (DTL) / Delhi Jal Board (DJB)  
> **Live Local Web App**: [http://localhost:8080](http://localhost:8080)

---

## 🏛️ Grounded in Delhi NCT Geography & Lifelines

In the National Capital Territory of Delhi, critical systems are tightly coupled. A grid trip at the **Bawana 400kV Substation** or severe monsoon inundation of the **Wazirabad Water Treatment Plant** immediately compromises drinking water for Central/North Delhi, cuts power to the **Delhi Traffic Police Central Control Room**, gridlocks the **Signature Bridge**, and threatens emergency trauma access to **AIIMS New Delhi**.

**CascadePulse Delhi NCR** models these vital interdependencies as an interactive directed graph to empower DDMA urban planners, emergency services, & infrastructure engineers to simulate cascading multi-hop outages, identify single points of failure, and evaluate targeted engineering interventions.

---

## 🗺️ Delhi Critical Assets (16 Nodes across 5 Sectors)

1. **⚡ Power & Energy (Delhi Transco Limited / DTL)**:
   - **Bawana 400kV Primary Substation (DTL)**: Stepping down bulk Northern Grid power for North-West Delhi.
   - **Maharani Bagh 400kV Substation**: Powering South Delhi and industrial corridors.
   - **IGI Airport Clean Solar & BESS Reserve**: 25MW solar + 100MWh battery energy storage.

2. **💧 Water & Sanitation (Delhi Jal Board - DJB)**:
   - **Wazirabad Water Treatment Plant (DJB)**: 135 MGD Yamuna potable water purification facility.
   - **Sonia Vihar Water Treatment Plant**: 140 MGD Upper Ganga Canal booster facility.

3. **🚗 Transportation & Mobility (DMRC & Delhi Traffic Police)**:
   - **Delhi Traffic Police Central Control Room (Todapur)**: Intelligent traffic systems synchronizing 1,200+ signals.
   - **Signature Bridge & Yamuna Corridor**: Vital 8-lane arterial carrying 110,000 vehicles/day.
   - **DMRC Yellow Line (Rajiv Chowk Metro Hub)**: Mass transit artery serving 550,000 daily commuters.
   - **Indira Gandhi International Airport (Terminal 3)**: Primary regional and international aviation hub.

4. **🏥 Healthcare & Public Safety Lifelines**:
   - **AIIMS New Delhi (Apex Level-1 Trauma Center)**: Premier referral hospital with critical ICUs and trauma surgery.
   - **Safdarjung Hospital Emergency Care**: Central government multi-specialty acute care facility.
   - **Delhi 112 / DDMA State Operations Center**: Consolidated emergency dispatch for Delhi Police, Fire, and CATS Ambulances.

5. **📡 Telecom & Strategic Reserves**:
   - **Connaught Place Fiber & Telecom Core (Eastern Court MTNL)**: Central internet exchange and cellular backhaul.
   - **IOCL Strategic Emergency Fuel Depot (Bijwasan)**: Northern India's largest petroleum and diesel storage.
   - **Rohini & Pitampura Residential District**: 320,000 residents dependent on grid power and water.
   - **Okhla Industrial & Nehru Place Commercial Hub**: 240,000 workers and tech infrastructure.

---

## 🌪️ Realistic Delhi Disaster Presets
- ⚡ **Bawana 400kV Substation Grid Trip**: Simulates major transmission failure in North-West Delhi.
- 🌊 **Yamuna Flood & Wazirabad WTP Inundation**: Simulates severe monsoon river surges halting water treatment.
- 🌉 **Signature Bridge Trans-Yamuna Closure**: Simulates structural closure and catastrophic arterial gridlock.
- 💻 **Delhi Traffic Police Cyber Breach**: Simulates loss of signal synchronization across Ring Road and ITO.
- 🌪️ **Compound Delhi Monsoon Storm**: Compounded disaster hitting Bawana Substation + Signature Bridge.

---

## 🛡️ Tested DDMA Resilience Interventions
1. **AIIMS Dedicated Solar-BESS Microgrid Intertie**: Isolates and shields AIIMS Apex Trauma Center from Delhi Transco grid collapse.
2. **Delhi Traffic Police 12h Industrial UPS**: Protects ITMS signal controllers to preserve emergency green corridors.
3. **DJB Wazirabad Auxiliary Diesel Turbine Bypass**: Equips Wazirabad plant with autonomous diesel turbine pumps to maintain water pressure for 450,000 citizens.
