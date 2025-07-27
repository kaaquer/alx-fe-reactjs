import React, { useState, useMemo, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';

const MEADesorberAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const reportRef = useRef();

  // Complete process data from your system
  const processStreams = {
    flueGas: {
      vaporFraction: 1,
      temperature: 40,
      pressure: 110,
      molarFlow: 85540,
      massFlow: 2389924.601,
      liquidVolumeFlow: 4377.528885,
      heatFlow: -260634961.8,
      co2MolarFlow: 3190.642,
      compositions: {
        N2: 0.8956,
        CO2: 0.0373,
        H2S: 0,
        MEAmine: 0,
        H2O: 0.0671
      }
    },
    leanMEAtoAbsorber: {
      vaporFraction: 0,
      temperature: 40.1637419,
      pressure: 101,
      molarFlow: 11800,
      massFlow: 280447.932,
      liquidVolumeFlow: 2826.617795,
      heatFlow: -346550590.2,
      co2MolarFlow: 3391.921855,
      compositions: {
        N2: 2.69012E-33,
        CO2: 0.028313304,
        H2S: 0,
        MEAmine: 0.108161893,
        H2O: 0.863524903
      }
    },
    sweetGas: {
      vaporFraction: 0.999999945,
      temperature: 51.66224707,
      pressure: 101,
      molarFlow: 87159.37219,
      massFlow: 2338038.795,
      liquidVolumeFlow: 4295.903149,
      heatFlow: -249248576.5,
      co2MolarFlow: 61.78959737,
      compositions: {
        N2: 0.878949791,
        CO2: 0.000708921,
        H2S: 0,
        MEAmine: 7.53594E-05,
        H2O: 0.120265923
      }
    },
    richMEAtoPump: {
      vaporFraction: 0,
      temperature: 42.74827383,
      pressure: 101,
      molarFlow: 11818.06278,
      massFlow: 285639.738,
      liquidVolumeFlow: 2908.243531,
      heatFlow: -347688648.03,
      co2MolarFlow: 6520.774258,
      compositions: {
        N2: 7.71711E-06,
        CO2: 0.055176338,
        H2S: 0,
        MEAmine: 0.109588405,
        H2O: 0.83522754
      }
    },
    richMEAtoHX: {
      vaporFraction: 0,
      temperature: 42.7683287,
      pressure: 202,
      molarFlow: 11818.06278,
      massFlow: 2856359.738,
      liquidVolumeFlow: 2908.243531,
      heatFlow: -347688648.03,
      co2MolarFlow: 6520.774258,
      compositions: {
        N2: 7.71711E-06,
        CO2: 0.055176338,
        H2S: 0,
        MEAmine: 0.109588405,
        H2O: 0.83522754
      }
    },
    richMEAtoDesorber: {
      vaporFraction: 0.00753275,
      temperature: 101.2412833,
      pressure: 200,
      molarFlow: 11818.06278,
      massFlow: 285359.738,
      liquidVolumeFlow: 2908.243531,
      heatFlow: -341537285.08,
      co2MolarFlow: 6520.774258,
      compositions: {
        N2: 7.71711E-06,
        CO2: 0.055176338,
        H2S: 0,
        MEAmine: 0.109588405,
        H2O: 0.83522754
      }
    },
    co2Product: {
      vaporFraction: 1,
      temperature: 109.9574067,
      pressure: 200,
      molarFlow: 10957.50306,
      massFlow: 278673.3336,
      liquidVolumeFlow: 308.8088566,
      heatFlow: -309181403.4,
      co2MolarFlow: 3125.348956,
      compositions: {
        N2: 8.32318E-05,
        CO2: 0.285224557,
        H2S: 0,
        MEAmine: 4.19211E-05,
        H2O: 0.71465029
      }
    },
    leanMEAfromDesorber: {
      vaporFraction: 1.65561E-06,
      temperature: 119.9998275,
      pressure: 200,
      molarFlow: 10723.1248,
      massFlow: 2577686.404,
      liquidVolumeFlow: 2599.434674,
      heatFlow: -303484809.10,
      co2MolarFlow: 3395.425301,
      compositions: {
        N2: 2.96683E-33,
        CO2: 0.031666912,
        H2S: 0,
        MEAmine: 0.12078334,
        H2O: 0.847549747
      }
    },
    leanMEAtoHX: {
      vaporFraction: 0,
      temperature: 120.0421133,
      pressure: 400,
      molarFlow: 10723.1248,
      massFlow: 2577686.404,
      liquidVolumeFlow: 2599.434674,
      heatFlow: -303477971.06,
      co2MolarFlow: 3395.425301,
      compositions: {
        N2: 2.96683E-33,
        CO2: 0.031666912,
        H2S: 0,
        MEAmine: 0.12078334,
        H2O: 0.847549747
      }
    },
    leanMEAtoCooler: {
      vaporFraction: 0,
      temperature: 52.76830117,
      pressure: 400,
      molarFlow: 10723.1248,
      massFlow: 2577686.404,
      liquidVolumeFlow: 2599.434674,
      heatFlow: -306259763.5,
      co2MolarFlow: 3395.425301,
      compositions: {
        N2: 2.96683E-33,
        CO2: 0.031666912,
        H2S: 0,
        MEAmine: 0.12078334,
        H2O: 0.847549747
      }
    },
    leanMEAtoMix: {
      vaporFraction: 0,
      temperature: 40,
      pressure: 101,
      molarFlow: 10723.1248,
      massFlow: 2577686.404,
      liquidVolumeFlow: 2599.434674,
      heatFlow: -310762716.83,
      co2MolarFlow: 3395.425301,
      compositions: {
        N2: 2.96683E-33,
        CO2: 0.031666912,
        H2S: 0,
        MEAmine: 0.12078334,
        H2O: 0.847549747
      }
    },
    makeupMEA: {
      vaporFraction: 0,
      temperature: 40,
      pressure: 101,
      molarFlow: 1257.687524,
      massFlow: 22717.5955,
      liquidVolumeFlow: 27.5404006,
      heatFlow: -35793542.95,
      co2MolarFlow: 0,
      compositions: {
        N2: 0,
        CO2: 0,
        H2S: 0,
        MEAmine: 0.001,
        H2O: 0.999
      }
    },
    toRecycle: {
      vaporFraction: 0,
      temperature: 40.16531783,
      pressure: 101,
      molarFlow: 11800,
      massFlow: 280480.4,
      liquidVolumeFlow: 2826.975075,
      heatFlow: -346556259.78,
      co2MolarFlow: 3395.425301,
      compositions: {
        N2: 2.65536E-33,
        CO2: 0.028342448,
        H2S: 0,
        MEAmine: 0.108208214,
        H2O: 0.863449338
      }
    }
  };

  // Energy streams data
  const energyStreams = {
    PQ1: 346667.4, // kJ/h
    condenserDuty: 135533658.5, // kJ/h  
    reboilerDuty: 848876106.8, // kJ/h
    PQ2: 683804.3, // kJ/h
    CQ: 113674047.7 // kJ/h (cooler duty)
  };

  // Molecular weights (kg/kmol)
  const MW = {
    CO2: 44.01,
    H2O: 18.015,
    MEA: 61.08,
    N2: 28.014
  };

  // User input state for selected process parameters
  const [userParams, setUserParams] = useState({
    flueGasTemp: processStreams.flueGas.temperature,
    flueGasPressure: processStreams.flueGas.pressure,
    flueGasCO2: processStreams.flueGas.compositions.CO2 * 100,
  });

  // Handler for user input
  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setUserParams((prev) => ({ ...prev, [name]: value }));
  };

  // Print/export handler
  const handlePrint = () => {
    if (reportRef.current) {
      window.print();
    }
  };

  // Calculate comprehensive performance metrics
  const calculations = useMemo(() => {
    const streams = processStreams;
    
    // CO2 Recovery Efficiency using mass flow rates (as recommended)
    const co2InFlueGas = streams.flueGas.co2MolarFlow * MW.CO2; // kg/h
    const co2InProduct = streams.co2Product.co2MolarFlow * MW.CO2; // kg/h
    const co2InSweetGas = streams.sweetGas.co2MolarFlow * MW.CO2; // kg/h
    const co2Recovery = ((co2InFlueGas - co2InSweetGas) / co2InFlueGas) * 100;
    const co2CaptureRate = co2InFlueGas - co2InSweetGas; // kg/h
    
    // Overall process efficiency
    const overallCO2Recovery = (co2InProduct / co2InFlueGas) * 100;
    
    // CO2 Loading calculations
    const meaInRich = streams.richMEAtoDesorber.molarFlow * streams.richMEAtoDesorber.compositions.MEAmine;
    const meaInLean = streams.leanMEAfromDesorber.molarFlow * streams.leanMEAfromDesorber.compositions.MEAmine;
    const richLoading = streams.richMEAtoDesorber.co2MolarFlow / meaInRich;
    const leanLoading = streams.leanMEAfromDesorber.co2MolarFlow / meaInLean;
    const loadingSwing = richLoading - leanLoading;
    
    // Solvent circulation rates
    const solventCirculation = streams.richMEAtoDesorber.massFlow; // kg/h
    const solventToGasRatio = solventCirculation / streams.flueGas.massFlow; // L/G ratio
    
    // Energy performance
    const totalEnergyInput = energyStreams.reboilerDuty + energyStreams.PQ1 + energyStreams.PQ2;
    const totalEnergyCooling = energyStreams.condenserDuty + energyStreams.CQ;
    const netEnergyConsumption = totalEnergyInput - totalEnergyCooling;
    const specificEnergyConsumption = totalEnergyInput / co2CaptureRate; // kJ/kg CO2
    const specificReboilerDuty = energyStreams.reboilerDuty / co2CaptureRate;
    
    // Heat integration potential
    const heatIntegrationPotential = (Math.abs(streams.leanMEAfromDesorber.heatFlow) - Math.abs(streams.richMEAtoDesorber.heatFlow)) / 1000; // MW
    
    // Desorber performance
    const co2DesorbedInDesorber = streams.richMEAtoDesorber.co2MolarFlow - streams.leanMEAfromDesorber.co2MolarFlow;
    const desorberEfficiency = (co2DesorbedInDesorber / streams.richMEAtoDesorber.co2MolarFlow) * 100;
    
    // Temperature approaches and driving forces
    const absorberTempApproach = streams.sweetGas.temperature - streams.flueGas.temperature;
    const desorberTempRange = streams.leanMEAfromDesorber.temperature - streams.richMEAtoDesorber.temperature;
    const heatExchangerEffectiveness = (streams.richMEAtoDesorber.temperature - streams.richMEAtoHX.temperature) / 
                                     (streams.leanMEAfromDesorber.temperature - streams.richMEAtoHX.temperature);
    
    // Economic indicators
    const steamConsumption = energyStreams.reboilerDuty / 2260; // kg/h (assuming 2260 kJ/kg latent heat)
    const coolingWaterDuty = totalEnergyCooling;
    
    // Process intensification metrics
    const absorberEfficiency = ((streams.flueGas.co2MolarFlow - streams.sweetGas.co2MolarFlow) / streams.flueGas.co2MolarFlow) * 100;
    const co2Purity = (streams.co2Product.compositions.CO2) * 100;
    
    return {
      // Recovery metrics
      co2Recovery,
      overallCO2Recovery,
      co2CaptureRate,
      absorberEfficiency,
      desorberEfficiency,
      
      // Loading metrics
      richLoading,
      leanLoading,
      loadingSwing,
      
      // Flow metrics
      solventCirculation,
      solventToGasRatio,
      
      // Energy metrics
      totalEnergyInput,
      totalEnergyCooling,
      netEnergyConsumption,
      specificEnergyConsumption,
      specificReboilerDuty,
      heatIntegrationPotential,
      steamConsumption,
      coolingWaterDuty,
      
      // Temperature metrics
      absorberTempApproach,
      desorberTempRange,
      heatExchangerEffectiveness,
      
      // Product quality
      co2Purity,
      co2DesorbedInDesorber
    };
  }, []);

  // Process flow data for Sankey-style visualization
  const processFlowData = [
    { stage: 'Flue Gas', co2Flow: processStreams.flueGas.co2MolarFlow * MW.CO2, temperature: processStreams.flueGas.temperature },
    { stage: 'Absorber', co2Flow: calculations.co2CaptureRate, temperature: processStreams.sweetGas.temperature },
    { stage: 'Rich MEA', co2Flow: processStreams.richMEAtoDesorber.co2MolarFlow * MW.CO2, temperature: processStreams.richMEAtoDesorber.temperature },
    { stage: 'Desorber', co2Flow: processStreams.co2Product.co2MolarFlow * MW.CO2, temperature: processStreams.co2Product.temperature },
    { stage: 'CO2 Product', co2Flow: processStreams.co2Product.co2MolarFlow * MW.CO2, temperature: processStreams.co2Product.temperature }
  ];

  // Energy distribution data
  const energyDistribution = [
    { name: 'Reboiler', value: energyStreams.reboilerDuty / 1e6, color: '#FF6B6B' },
    { name: 'Condenser', value: energyStreams.condenserDuty / 1e6, color: '#4ECDC4' },
    { name: 'Cooler', value: energyStreams.CQ / 1e6, color: '#45B7D1' },
    { name: 'Pumps', value: (energyStreams.PQ1 + energyStreams.PQ2) / 1e6, color: '#96CEB4' }
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium text-sm rounded-t-lg border-b-2 transition-colors ${
        active 
          ? 'text-blue-600 border-blue-600 bg-blue-50' 
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );

  // Add a helper for tooltips
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });
  const showTooltip = (text, e) => {
    setTooltip({ show: true, text, x: e.clientX, y: e.clientY });
  };
  const hideTooltip = () => setTooltip({ show: false, text: '', x: 0, y: 0 });

  // Update MetricCard to show tooltip on info icon
  const MetricCard = ({ title, value, unit, description, color = 'blue', trend = null, tooltipText }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500 hover:shadow-lg transition-shadow relative`}>
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800 mr-2">{title}</h3>
        {tooltipText && (
          <span
            className="ml-1 text-blue-400 cursor-pointer"
            onMouseEnter={(e) => showTooltip(tooltipText, e)}
            onMouseLeave={hideTooltip}
            aria-label="Info"
          >
            &#9432;
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {typeof value === 'number' ? value.toFixed(2) : value}
        <span className="text-sm font-normal text-gray-600 ml-2">{unit}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      {trend && (
        <div className={`mt-2 text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '\u2197' : '\u2198'} {Math.abs(trend).toFixed(1)}% vs benchmark
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen relative">
      {/* Tooltip overlay */}
      {tooltip.show && (
        <div
          style={{ position: 'fixed', left: tooltip.x + 10, top: tooltip.y + 10, zIndex: 1000 }}
          className="bg-gray-800 text-white text-xs rounded px-3 py-2 shadow-lg pointer-events-none"
        >
          {tooltip.text}
        </div>
      )}
      {/* Export/Print Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          onClick={handlePrint}
        >
          Export/Print Report
        </button>
      </div>
      {/* User Input Form */}
      <form className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-wrap gap-6 items-end">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Flue Gas Temp (°C)</label>
          <input
            type="number"
            name="flueGasTemp"
            value={userParams.flueGasTemp}
            onChange={handleParamChange}
            className="border rounded px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Flue Gas Pressure (kPa)</label>
          <input
            type="number"
            name="flueGasPressure"
            value={userParams.flueGasPressure}
            onChange={handleParamChange}
            className="border rounded px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Flue Gas CO₂ (%)</label>
          <input
            type="number"
            name="flueGasCO2"
            value={userParams.flueGasCO2}
            onChange={handleParamChange}
            className="border rounded px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div>
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
            onClick={() => {
              // Optionally, update processStreams with userParams and recalculate (not implemented for static demo)
              alert('Live update not implemented in this demo.');
            }}
          >
            Update Analysis
          </button>
        </div>
      </form>
      {/* Main Report Content */}
      <div ref={reportRef} className="print:bg-white print:text-black">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete MEA CO₂ Capture Process Analysis</h1>
          <p className="text-gray-600">Comprehensive Chemical Engineering Analysis - Absorber, Desorber & Heat Integration</p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="CO₂ Capture Rate"
            value={calculations.co2Recovery}
            unit="%"
            description="Flue gas to sweet gas efficiency"
            color="green"
            trend={calculations.co2Recovery > 90 ? 5 : -10}
            tooltipText="CO₂ capture rate is a measure of how efficiently CO₂ is removed from the flue gas stream."
          />
          <MetricCard
            title="CO₂ Product Recovery"
            value={calculations.overallCO2Recovery}
            unit="%"
            description="Overall CO₂ to product stream"
            color="blue"
            tooltipText="Overall CO₂ product recovery is the percentage of CO₂ captured from the flue gas that ends up in the product stream."
          />
          <MetricCard
            title="Energy Consumption"
            value={(calculations.specificEnergyConsumption / 1000)}
            unit="MJ/kg CO₂"
            description="Total energy per kg CO₂ captured"
            color="red"
            tooltipText="Specific energy consumption is the total energy input divided by the CO₂ capture rate."
          />
          <MetricCard
            title="CO₂ Purity"
            value={calculations.co2Purity}
            unit="%"
            description="CO₂ concentration in product"
            color="purple"
            tooltipText="CO₂ purity in the product stream is a measure of how pure the CO₂ is."
          />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <TabButton id="overview" label="Process Overview" active={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton id="absorber" label="Absorber Analysis" active={activeTab === 'absorber'} onClick={setActiveTab} />
            <TabButton id="desorber" label="Desorber Analysis" active={activeTab === 'desorber'} onClick={setActiveTab} />
            <TabButton id="energy" label="Energy Integration" active={activeTab === 'energy'} onClick={setActiveTab} />
            <TabButton id="optimization" label="Process Optimization" active={activeTab === 'optimization'} onClick={setActiveTab} />
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Process Flow Diagram */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Process Flow & CO₂ Mass Balance</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={processFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis yAxisId="left" label={{ value: 'CO₂ Flow (kg/h)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Temperature (°C)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="co2Flow" fill="#8884d8" name="CO₂ Flow Rate" />
                  <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={3} name="Temperature" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Mass Balance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">CO₂ Mass Balance (kg/h)</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Flue Gas Input:</span>
                    <span className="font-mono text-lg">{(processStreams.flueGas.co2MolarFlow * MW.CO2).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="font-medium">Sweet Gas (vented):</span>
                    <span className="font-mono text-lg">{(processStreams.sweetGas.co2MolarFlow * MW.CO2).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">CO₂ Product:</span>
                    <span className="font-mono text-lg">{(processStreams.co2Product.co2MolarFlow * MW.CO2).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-t-2 border-blue-200">
                    <span className="font-semibold">Net Captured:</span>
                    <span className="font-mono text-xl font-bold">{calculations.co2CaptureRate.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Energy Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={energyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, value}) => `${name}: ${value.toFixed(1)} MW`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {energyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value.toFixed(1)} MW`, 'Energy']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Process Summary Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Key Process Streams</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stream</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp (°C)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pressure (kPa)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO₂ Flow (kg/h)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO₂ Fraction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Flue Gas</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.flueGas.temperature}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.flueGas.pressure}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.flueGas.co2MolarFlow * MW.CO2).toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.flueGas.compositions.CO2 * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sweet Gas</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.sweetGas.temperature.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.sweetGas.pressure}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.sweetGas.co2MolarFlow * MW.CO2).toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.sweetGas.compositions.CO2 * 100).toFixed(3)}%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CO₂ Product</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.co2Product.temperature.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.co2Product.pressure}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.co2Product.co2MolarFlow * MW.CO2).toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.co2Product.compositions.CO2 * 100).toFixed(1)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'absorber' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Absorber Efficiency"
                value={calculations.absorberEfficiency}
                unit="%"
                description="CO₂ removal from flue gas"
                color="green"
                tooltipText="Absorber efficiency measures how effectively CO₂ is absorbed from the flue gas stream."
              />
              <MetricCard
                title="L/G Ratio"
                value={calculations.solventToGasRatio}
                unit="kg/kg"
                description="Liquid to gas mass ratio"
                color="blue"
                tooltipText="Liquid to gas ratio (L/G) is a measure of the amount of liquid solvent (MEA) per unit volume of gas."
              />
              <MetricCard
                title="Rich Loading"
                value={calculations.richLoading}
                unit="mol CO₂/mol MEA"
                description="CO₂ loading after absorption"
                color="purple"
                tooltipText="Rich loading refers to the CO₂ concentration in the rich MEA stream after absorption."
              />
              <MetricCard
                title="Temperature Rise"
                value={calculations.absorberTempApproach}
                unit="°C"
                description="Heat of absorption effect"
                color="red"
                tooltipText="Temperature rise in the absorber is a measure of the heat absorbed during CO₂ absorption."
              />
            </div>

            {/* Absorber Stream Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Absorber Stream Details</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stream</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp (°C)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO₂ Fraction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MEA Fraction</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Flue Gas</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.flueGas.temperature}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.flueGas.compositions.CO2 * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.flueGas.compositions.MEAmine * 100).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lean MEA</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.leanMEAtoAbsorber.temperature.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.leanMEAtoAbsorber.compositions.CO2 * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.leanMEAtoAbsorber.compositions.MEAmine * 100).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rich MEA</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.richMEAtoDesorber.temperature.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.richMEAtoDesorber.compositions.CO2 * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.richMEAtoDesorber.compositions.MEAmine * 100).toFixed(2)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'desorber' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Desorber Efficiency"
                value={calculations.desorberEfficiency}
                unit="%"
                description="CO₂ released from rich MEA"
                color="green"
                tooltipText="Desorber efficiency is a measure of how effectively CO₂ is released from the rich MEA stream."
              />
              <MetricCard
                title="Lean Loading"
                value={calculations.leanLoading}
                unit="mol CO₂/mol MEA"
                description="CO₂ loading after desorption"
                color="blue"
                tooltipText="Lean loading refers to the CO₂ concentration in the lean MEA stream after desorption."
              />
              <MetricCard
                title="Desorber Temp Range"
                value={calculations.desorberTempRange}
                unit="°C"
                description="Temperature increase in desorber"
                color="red"
                tooltipText="Temperature range in the desorber is the difference between the rich and lean MEA temperatures."
              />
              <MetricCard
                title="CO₂ Desorbed"
                value={calculations.co2DesorbedInDesorber}
                unit="mol/h"
                description="Moles of CO₂ released"
                color="purple"
                tooltipText="CO₂ desorbed in the desorber is the difference in CO₂ molar flow between rich and lean MEA."
              />
            </div>
            {/* Desorber Stream Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Desorber Stream Details</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stream</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp (°C)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO₂ Fraction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MEA Fraction</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rich MEA</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.richMEAtoDesorber.temperature.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.richMEAtoDesorber.compositions.CO2 * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.richMEAtoDesorber.compositions.MEAmine * 100).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lean MEA</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.leanMEAfromDesorber.temperature.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.leanMEAfromDesorber.compositions.CO2 * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.leanMEAfromDesorber.compositions.MEAmine * 100).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CO₂ Product</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{processStreams.co2Product.temperature.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.co2Product.compositions.CO2 * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(processStreams.co2Product.compositions.MEAmine * 100).toFixed(5)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'energy' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Energy Input"
                value={calculations.totalEnergyInput / 1e6}
                unit="MW"
                description="All process energy inputs"
                color="red"
                tooltipText="Total energy input includes reboiler duty, pump work, and heat losses."
              />
              <MetricCard
                title="Net Energy Consumption"
                value={calculations.netEnergyConsumption / 1e6}
                unit="MW"
                description="Input minus cooling"
                color="blue"
                tooltipText="Net energy consumption is the total energy input minus the energy used for cooling."
              />
              <MetricCard
                title="Specific Reboiler Duty"
                value={calculations.specificReboilerDuty / 1000}
                unit="MJ/kg CO₂"
                description="Reboiler energy per kg CO₂"
                color="green"
                tooltipText="Specific reboiler duty is the energy required to vaporize MEA per kilogram of CO₂ captured."
              />
              <MetricCard
                title="Heat Integration Potential"
                value={calculations.heatIntegrationPotential}
                unit="MW"
                description="Potential for heat recovery"
                color="purple"
                tooltipText="Heat integration potential refers to the difference in heat flow between rich and lean MEA streams."
              />
            </div>
            {/* Energy Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Energy Streams</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stream</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duty (MW)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Reboiler</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(energyStreams.reboilerDuty / 1e6).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Condenser</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(energyStreams.condenserDuty / 1e6).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cooler</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(energyStreams.CQ / 1e6).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pumps</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{((energyStreams.PQ1 + energyStreams.PQ2) / 1e6).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Steam Consumption"
                value={calculations.steamConsumption}
                unit="kg/h"
                description="Estimated steam for reboiler"
                color="blue"
                tooltipText="Steam consumption is a measure of the energy required to vaporize MEA in the reboiler."
              />
              <MetricCard
                title="Cooling Water Duty"
                value={calculations.coolingWaterDuty / 1e6}
                unit="MW"
                description="Total cooling required"
                color="green"
                tooltipText="Cooling water duty is the energy required to cool the process streams."
              />
              <MetricCard
                title="Loading Swing"
                value={calculations.loadingSwing}
                unit="mol CO₂/mol MEA"
                description="Rich-lean loading difference"
                color="purple"
                tooltipText="Loading swing is the difference in CO₂ loading between rich and lean MEA streams."
              />
              <MetricCard
                title="Heat Exchanger Effectiveness"
                value={calculations.heatExchangerEffectiveness}
                unit="-"
                description="Approach to ideal heat transfer"
                color="red"
                tooltipText="Heat exchanger effectiveness is a measure of how close the actual heat transfer is to the ideal."
              />
            </div>
            {/* Optimization Suggestions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Optimization Suggestions</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Reduce reboiler duty by optimizing heat integration and using advanced control strategies.</li>
                <li>Increase solvent concentration or circulation rate to improve CO₂ capture, but monitor for increased energy use.</li>
                <li>Utilize waste heat from other plant operations for pre-heating streams.</li>
                <li>Monitor and minimize MEA degradation and losses to reduce operating costs.</li>
                <li>Consider advanced packing or internals in absorber/desorber for better mass transfer.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MEADesorberAnalysis;