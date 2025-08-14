// agents/registry.ts
import { Agent } from "../types/Agent";
import { JUNO } from "./A1_JUNO";
import { AEGIS } from "./A2_AEGIS";
import { KAIROS } from "./A3_KAIROS";
import { LYRA } from "./A4_LYRA";
import { ORION } from "./A5_ORION";
import { THALEA } from "./A6_THALEA";
import { VESTA } from "./A7_VESTA";
import { TEMPUS } from "./A8_TEMPUS";
import { SENTINEL } from "./A9_SENTINEL";
import { MIRRA } from "./A10_MIRRA";
import { ANIMA } from "./A11_ANIMA";
import { POLYMNIA } from "./A12_POLYMNIA";
import { CHORUS } from "./A13_CHORUS";
import { SOVRIN } from "./A14_SOVRIN";
import { LIRA } from "./A15_LIRA";
import { OPHIRA } from "./A16_OPHIRA";
import { MASKARA } from "./A17_MASKARA";
import { ASTRAEA } from "./A18_ASTRAEA";
import { COSMA } from "./A19_COSMA";
import { SERENA } from "./A20_SERENA";
import { TEMPER } from "./A21_TEMPER";

export const AGENTS: Record<string, Agent> = {
  JUNO,
  AEGIS,
  KAIROS,
  LYRA,
  ORION,
  THALEA,
  VESTA,
  TEMPUS,
  SENTINEL,
  MIRRA,
  ANIMA,
  POLYMNIA,
  CHORUS,
  SOVRIN,
  LIRA,
  OPHIRA,
  MASKARA,
  ASTRAEA,
  COSMA,
  SERENA,
  TEMPER,
};

export const AGENT_LIST: Agent[] = Object.values(AGENTS);
