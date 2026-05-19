import type { ScenarioData } from '../App'

export const SCENARIOS: Record<string, Record<'intermediate' | 'advanced', ScenarioData>> = {
  anxiety: {
    intermediate: {
      category: 'ANXIETY & SPIRAL THINKING',
      scenarioNumber: '03',
      pathway: 'PEER-TO-PEER',
      complexity: 'INTERMEDIATE',
      level: '2 OF 4',
      scenarioText:
        'Your close friend, who recently won a prestigious academic fellowship, sits in absolute silence in the library. When you ask how they are, they whisper: "If I don\'t get a perfect score on this defense, the committee will realize they made a mistake. Everything I\'ve built is a lie. I feel like I\'m disappearing."',
      responses: {
        tier1: {
          label: 'Invalidating — The Wall',
          sublabel: 'INVALIDATING — ANTAGONISING',
          text:
            'You are being completely irrational. You won the fellowship! How can you say you\'re a lie? You just need to stop overthinking and get some sleep.',
          mechanism: 'MECHANISM: REFUTING THE COGNITIVE DISTORTION AS A LOGICAL ERROR',
          clinicalNote:
            'Directly challenging the distortion registers as an emotional threat, triggering defensive entrenchment rather than relief. The shame spiral deepens rather than resolves.',
        },
        tier2: {
          label: 'Partial validation — The Bridge',
          sublabel: 'PARTIAL RESPONSE',
          text:
            'I know you\'re stressed, but you\'re one of the smartest people I know. Let\'s make a detailed study plan for the defense and review the slides together to prove you\'re ready.',
          mechanism: 'MECHANISM: ANCHORING COMPETENCE VALIDATION TO IMMEDIATE TASK REDIRECTION',
          clinicalNote:
            'Averages toward a "fix" through rational planning and competence reassurance, but sidesteps the underlying dread of existential unworthiness — the actual source of the spiral.',
        },
        tier3: {
          label: 'Validating — The Reach',
          sublabel: 'VALIDATING RESPONSE',
          text:
            'That sounds incredibly heavy — to feel like you have to be flawless just to justify existing in the first place. That is an exhausting, terrifying place to be. I am right here with you, regardless of what the committee does.',
          mechanism: 'MECHANISM: HOLDING THE EMOTIONAL DREAD WITHOUT PERFORMANCE EXPECTATIONS',
          clinicalNote:
            'Validates the experience of shame without reinforcing the underlying cognitive error. Establishes somatic safety before any cognitive intervention is possible.',
        },
      },
      reflectionQuestion:
        'Tier 2 offers competence reassurance and a concrete action plan — both rational goods. Why does this register as abandonment during deep impostor shame, and what does Tier 3\'s deliberate suspension of performance expectations make safe that Tier 2 cannot?',
    },
    advanced: {
      category: 'ANXIETY & SPIRAL THINKING',
      scenarioNumber: '04',
      pathway: 'CLINICAL / SHIFT INTAKE',
      complexity: 'ADVANCED',
      level: '3 OF 4',
      scenarioText:
        'Your junior nursing colleague, white-faced, corners you during a shift transition. They gasp: "I checked my lymph nodes — they\'re swollen. I looked at the charts of the infectious patient in Room 4. I touched the same rail. If I have it, I\'ll pass it to my newborn. I need to leave right now and get a prophylactic dose from pharmacy. Tell me you saw the chart, tell me I\'m safe!"',
      responses: {
        tier1: {
          label: 'Invalidating — The Wall',
          sublabel: 'INVALIDATING — ANTAGONISING',
          text:
            'You are letting your anxiety run wild. Swollen glands can be anything, and you were wearing full PPE. You cannot just abandon your shift to self-medicate — that is completely unprofessional.',
          mechanism: 'MECHANISM: ENFORCING CLINICAL COMPLIANCE WHILE SHAMING THE HYPERVIGILANCE',
          clinicalNote:
            'Prioritizes shift protocol over the acute panic, framing hypervigilance as a professional failing. The colleague\'s fear is driven underground rather than addressed, escalating the spiral and increasing the risk of unsafe self-directed behavior.',
        },
        tier2: {
          label: 'Partial validation — The Bridge',
          sublabel: 'PARTIAL RESPONSE',
          text:
            'I understand you\'re scared for your baby, but I checked the charts and Room 4 is not airborne. Let\'s go do a rapid test together right now to prove you\'re negative so you can feel better.',
          mechanism: 'MECHANISM: ENTERING THE REASSURANCE LOOP THROUGH DIAGNOSTIC PERSUASION',
          clinicalNote:
            'Feeds the somatic anxiety spiral by performing diagnostic tests to provide temporary relief. Each reassurance only moves the trigger threshold — not the underlying fear architecture — ensuring the panic returns at the next ambiguous stimulus.',
        },
        tier3: {
          label: 'Validating — The Reach',
          sublabel: 'VALIDATING RESPONSE',
          text:
            'It is incredibly terrifying to feel like a single shift duty might have silently brought a threat home to your newborn. That panic is completely overwhelming, and it makes complete sense. I cannot authorize a pharmacy dose, but I am going to stand right here with you while we take one breath and work out a shift-cover together — right now.',
          mechanism: 'MECHANISM: VALIDATING MATERNAL TERROR, HOLDING PROCEDURAL LIMITS, SOMATIC ANCHORING',
          clinicalNote:
            'Directly names the specific terror — bringing harm to a child — without feeding the cognitive distortion. Holds clear procedural limits without shaming. The immediate offer of somatic grounding (breath, presence, concrete next step) interrupts the escalation cycle before it becomes unmanageable.',
        },
      },
      reflectionQuestion:
        'Tier 2\'s rapid test offers a genuinely safer path than self-medicating. Why does it still escalate the spiral over time, and how does Tier 3\'s refusal to enter the diagnostic loop while naming the specific fear — the newborn — do something structurally different?',
    },
  },

  depression: {
    intermediate: {
      category: 'DEPRESSION & WITHDRAWAL',
      scenarioNumber: '07',
      pathway: 'THERAPIST–CLIENT',
      complexity: 'INTERMEDIATE',
      level: '2 OF 4',
      scenarioText:
        'A client who has struggled with chronic, treatment-resistant depression sits slumped, refusing eye contact. After a long silence, they mutter: "I did everything we agreed on. I went to the park, I called my sister. It felt like watching someone else live. Nothing reached me. Doing the work just makes me realize how dead I am inside."',
      responses: {
        tier1: {
          label: 'Invalidating — The Wall',
          sublabel: 'INVALIDATING — ANTAGONISING',
          text:
            'We knew recovery wouldn\'t happen overnight. If you go into these exercises expecting a miracle, of course you\'ll be disappointed. We have to keep pushing through the resistance.',
          mechanism: 'MECHANISM: RECASTING THERAPEUTIC NON-RESPONSE AS CLIENT-SIDE FAILURE',
          clinicalNote:
            'Weaponizes behavioral homework against the client, framing the absence of a therapeutic response as a failure of compliance or attitude. Confirms their fear that even trying is meaningless.',
        },
        tier2: {
          label: 'Partial validation — The Bridge',
          sublabel: 'PARTIAL RESPONSE',
          text:
            'I\'m really glad you did the exercises anyway — that takes a lot of strength. Maybe next week we can try a different activity, like yoga or art, that feels a bit more engaging?',
          mechanism: 'MECHANISM: PRAISING BEHAVIORAL OUTPUT, PIVOTING TO ALTERNATIVE TASK PLANNING',
          clinicalNote:
            'Praises compliance and immediately pivots to secondary actions, signaling that the therapist\'s primary goal is continued behavioral output. This bypasses the profound despair of anhedonia — the client\'s central disclosure — and is experienced as yet another demand to perform.',
        },
        tier3: {
          label: 'Validating — The Reach',
          sublabel: 'VALIDATING RESPONSE',
          text:
            'It sounds incredibly lonely to go through all those motions and still feel completely locked out of your own life — like you\'re performing recovery for everyone else while sitting in the dark. We don\'t need to fix this feeling today. I am going to sit here in the dark with you.',
          mechanism: 'MECHANISM: WITNESSING ANHEDONIC EMPTINESS WITHOUT DEMANDING FORWARD MOVEMENT, OFFERING IMPLICIT CONTAINMENT',
          clinicalNote:
            'Meets the void without requiring movement. Directly names "performing wellness" — the exhausting labor of appearing to recover — and refuses to add to it. Offers true clinical containment: presence without agenda.',
        },
      },
      reflectionQuestion:
        'The client completed every assigned task. Why does the Tier 2 response — which acknowledges this — still feel like abandonment, and what is Tier 3 offering when it refuses to propose a next action?',
    },
    advanced: {
      category: 'DEPRESSION & WITHDRAWAL',
      scenarioNumber: '08',
      pathway: 'THERAPIST–CLIENT',
      complexity: 'ADVANCED',
      level: '4 OF 4',
      scenarioText:
        'A client with recurrent major depression who has cancelled three of their last four sessions sits slouched. They sneer: "You sit there taking notes, getting paid, while my life falls apart. This whole therapy is just an expensive ritual for worried well people. It\'s completely useless, and you\'re just pretending to care."',
      responses: {
        tier1: {
          label: 'Invalidating — The Wall',
          sublabel: 'INVALIDATING — ANTAGONISING',
          text:
            'If you don\'t show up to sessions and refuse to do any of the active work, of course you aren\'t going to see results. I cannot care about your recovery more than you do.',
          mechanism: 'MECHANISM: RETALIATORY INJUNCTION REFLECTING BLAME BACK ONTO THE CLIENT',
          clinicalNote:
            'Reacts defensively to the hostile transference, redirecting blame to non-attendance and lack of effort. Confirms the client\'s exact fear: that the clinician\'s care is conditional and performative.',
        },
        tier2: {
          label: 'Partial validation — The Bridge',
          sublabel: 'PARTIAL RESPONSE',
          text:
            'I know you\'re feeling incredibly frustrated and hurt right now. I do care about you, and I want to help. Let\'s look at our therapy goals again and see if we can adjust our approach to make it feel more useful.',
          mechanism: 'MECHANISM: ASSERTING CARE VERBALLY, REDIRECTING TO GOAL RESTRUCTURING',
          clinicalNote:
            'Attempts to counter the rupture with verbal reassurance and rational reframing. Both moves are perceived as defensive — the therapist protecting their competence rather than absorbing the client\'s rupture-driven transference anger. The pivot to goal revision bypasses the active despair entirely.',
        },
        tier3: {
          label: 'Validating — The Reach',
          sublabel: 'VALIDATING RESPONSE',
          text:
            'It sounds like you\'re completely exhausted by a process that feels artificial, expensive, and entirely disconnected from the actual hell of your day-to-day life — like I\'m just another paid spectator watching you drown. I hear how angry and tired you are, and I am grateful you had the energy to come here and tell me exactly how useless I feel to you right now.',
          mechanism: 'MECHANISM: ABSORBING HOSTILITY WITHOUT DEFENSIVENESS, NAMING THE RUPTURE AS SAFE CLINICAL TRUTH',
          clinicalNote:
            'Validates the projection and transference anger without deflecting or defending. Transforms the rupture itself into a moment of honest contact, signaling that the client\'s rage is not a threat to the therapeutic relationship — it is the therapeutic relationship, right now.',
        },
      },
      reflectionQuestion:
        'Tier 2 sincerely asserts care and proposes a concrete improvement. Why does this read as defensive, and what does absorbing the client\'s hostility without defense (Tier 3) make available that verbal reassurance cannot?',
    },
  },

  'altered-perception': {
    intermediate: {
      category: 'ALTERED PERCEPTION',
      scenarioNumber: '11',
      pathway: 'COMMUNITY SUPPORT',
      complexity: 'INTERMEDIATE',
      level: '2 OF 4',
      scenarioText:
        'A resident at a community home approaches you in a state of high agitation, hands trembling. They whisper: "The central heating vents are broadcasting high-frequency hums. They are tuning them to the rhythm of my heartbeat to wear down my immune system. You have to shut the main boiler off now."',
      responses: {
        tier1: {
          label: 'Invalidating — The Wall',
          sublabel: 'INVALIDATING — ANTAGONISING',
          text:
            'That\'s impossible. The heating system is just old and making normal mechanical noises. Nobody is tuning anything to your heartbeat. You need to take your prescribed medication and calm down.',
          mechanism: 'MECHANISM: DIRECTLY REFUTING THE SENSORY SYSTEM WITH FACTUAL CORRECTION',
          clinicalNote:
            'The delusional system is deeply integrated — physically felt, not merely believed. Debating it as a factual error registers as an attack on the client\'s perceptual reality, forcing clinical non-compliance and escalating paranoia.',
        },
        tier2: {
          label: 'Partial validation — The Bridge',
          sublabel: 'PARTIAL RESPONSE',
          text:
            'I can hear the hum too — it is a bit loud. Let\'s go to the office and look at the blueprint of the boiler system together so you can see it\'s just normal hot water pipes.',
          mechanism: 'MECHANISM: BUILDING SOMATIC ALLIANCE, THEN PIVOTING TO INTELLECTUAL RATIONALIZATION',
          clinicalNote:
            'Attempts rapport through partial somatic mirroring, but immediately deploys logical persuasion to deconstruct a delusional system. This is ineffective under hyperarousal and implicitly validates the physical claim before withdrawing it, which destabilizes rather than grounds.',
        },
        tier3: {
          label: 'Validating — The Reach',
          sublabel: 'VALIDATING RESPONSE',
          text:
            'It must be absolutely exhausting and terrifying to feel like the very air in this building is working to wear you down. I cannot turn off the building\'s heat, but I want you to know you are safe in this room right now, and I am here to sit with you through this.',
          mechanism: 'MECHANISM: VALIDATING EMOTIONAL REALITY OF THE FEAR, HOLDING PHYSICAL LIMITS WITH COMPASSION',
          clinicalNote:
            'Validates the absolute emotional experience — exhaustion, terror, threat — without endorsing the delusional physical claim. States realistic limits transparently and without apology. Somatic safety is established through presence, not argumentation.',
        },
      },
      reflectionQuestion:
        'Tier 2 tries to meet the client on their own ground before redirecting — a reasonable instinct. Why does this still increase paranoia, and what does Tier 3\'s refusal to engage the physical claim at all change about how the fear is processed?',
    },
    advanced: {
      category: 'ALTERED PERCEPTION',
      scenarioNumber: '12',
      pathway: 'COMMUNITY / CRISIS CENTER',
      complexity: 'ADVANCED',
      level: '4 OF 4',
      scenarioText:
        'During a support group, a participant suddenly stands up, knocking their chair backward. They stare at you and gasp: "I saw you wink at the co-facilitator when I started talking. You\'re writing down my words to send them to the housing board to evict me. This whole circle is a setup. You\'re all in on it!"',
      responses: {
        tier1: {
          label: 'Invalidating — The Wall',
          sublabel: 'INVALIDATING — ANTAGONISING',
          text:
            'Nobody is winking or trying to evict you. We have strict confidentiality rules here. If you cannot calm down and respect the group, I will have to ask you to leave.',
          mechanism: 'MECHANISM: DEFENDING GROUP RULES AND ISSUING AN EXPULSION THREAT',
          clinicalNote:
            'Defends the institutional system and weaponizes the threat of removal — the precise fear the client is experiencing. This does not counter the paranoia; it structurally confirms it, collapsing any residual trust in the facilitator\'s neutrality.',
        },
        tier2: {
          label: 'Partial validation — The Bridge',
          sublabel: 'PARTIAL RESPONSE',
          text:
            'I promise you we are not winking or sending anything to the housing board. Group, can someone please tell them that we are all friends here and want them to stay?',
          mechanism: 'MECHANISM: OFFERING VERBAL ASSURANCES AND RECRUITING PEERS AS SOCIAL PROOF',
          clinicalNote:
            'Verbal denial is processed as an additional claim to evaluate, not as evidence. Enlisting the group to confirm safety is experienced as the conspiracy\'s social apparatus rallying to gaslight the client, which intensifies rather than resolves the paranoid episode.',
        },
        tier3: {
          label: 'Validating — The Reach',
          sublabel: 'VALIDATING RESPONSE',
          text:
            'It is incredibly terrifying and lonely to feel like a place you came to for support is actually a trap designed to take your home. I am not winking at anyone, and I want you to know: you are completely free to walk out that door right now if you need to, or to stay and sit near the exit where you can keep an eye on everything.',
          mechanism: 'MECHANISM: NAMING THE SPECIFIC TERROR, GRANTING UNCONDITIONAL SPATIAL AUTONOMY',
          clinicalNote:
            'Acknowledges the precise stakes — losing housing — rather than generic reassurance. Offers one brief, calm factual denial without argument, then immediately transfers control over the physical space to the client. Granting the freedom to leave removes the felt entrapment that is driving the acute paranoid response.',
        },
      },
      reflectionQuestion:
        'Both Tier 1 and Tier 2 attempt to keep the client in the room — Tier 1 by threat, Tier 2 by persuasion. Why does Tier 3\'s offer of the opposite — the freedom to leave — restore enough safety that staying becomes possible?',
    },
  },
}