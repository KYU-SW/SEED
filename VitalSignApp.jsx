import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Home, Users, Dna, MessageSquare, Video, Bell, Stethoscope, CheckCircle2, Send, Mic, MicOff, VideoOff, PhoneOff, MonitorUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const family = [
  { id: 1, name: "이정호", rel: "친할아버지", x: 15, y: 15, shape: "square", affected: true },
  { id: 2, name: "박영자", rel: "친할머니", x: 35, y: 15, shape: "circle" },
  { id: 3, name: "김영수", rel: "외할아버지", x: 65, y: 15, shape: "square", affected: true },
  { id: 4, name: "김순희", rel: "외할머니", x: 85, y: 15, shape: "circle", affected: true },
  { id: 5, name: "이민수", rel: "아버지", x: 35, y: 52, shape: "square", affected: true },
  { id: 6, name: "김지영", rel: "어머니", x: 65, y: 52, shape: "circle", affected: true },
  { id: 7, name: "이아연", rel: "환자", x: 50, y: 86, shape: "circle", affected: true, patient: true },
];

function Dashboard({ go }) {
  return <div className="space-y-5">
    <section className="rounded-3xl bg-gradient-to-br from-violet-700 to-blue-600 p-6 text-white shadow-lg">
      <Badge className="bg-white/20 text-white">활성 협진 케이스 · VS-2026-0142</Badge>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-bold">미진단 신경근육·심장 복합 표현형</h1><p className="mt-2 text-sm text-blue-100">환자 이아연 · 근력 저하 · 부정맥 · 감각신경성 난청</p></div><Button onClick={() => go("meeting")} className="bg-white text-violet-700"><Video className="mr-2 h-4 w-4"/>영상 협진 시작</Button></div>
    </section>
    <div className="grid gap-4 lg:grid-cols-3"><Card className="rounded-2xl lg:col-span-2"><CardContent className="p-5"><div className="flex justify-between"><b>진단 파이프라인</b><span className="text-sm font-bold text-violet-700">4/6 단계</span></div><Progress value={67} className="mt-3"/><div className="mt-5 grid grid-cols-6 gap-2">{["접수","표현형","유전체","협진","재분석","확정"].map((x,i)=><div className="text-center" key={x}><div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${i<4?"bg-violet-600 text-white":"bg-slate-100 text-slate-400"}`}>{i<4?<CheckCircle2 className="h-4 w-4"/>:i+1}</div><p className="mt-1 text-xs text-slate-500">{x}</p></div>)}</div></CardContent></Card><Card className="rounded-2xl"><CardContent className="p-5"><p className="text-sm text-slate-500">다음 협진</p><p className="mt-1 text-xl font-bold">9월 30일 14:00</p><p className="mt-2 text-sm text-slate-600">WGS 재분석 공동 판독</p><Button onClick={() => go("meeting")} variant="outline" className="mt-4 w-full">협진룸 입장</Button></CardContent></Card></div>
    <div className="grid gap-4 lg:grid-cols-2"><Card className="rounded-2xl"><CardContent className="p-5"><h3 className="font-bold">협진 의료진</h3>{[["김서진","소아신경과"],["박도윤","진단검사의학과"],["최유나","심장내과"],["정하람","이비인후과"]].map(x=><div key={x[0]} className="flex items-center justify-between border-b py-3"><div className="flex items-center gap-3"><Stethoscope className="h-4 w-4 text-blue-600"/><div><p className="text-sm font-semibold">{x[0]} 교수</p><p className="text-xs text-slate-500">{x[1]}</p></div></div><Badge variant="secondary">참여</Badge></div>)}</CardContent></Card><Card className="rounded-2xl"><CardContent className="p-5"><h3 className="font-bold">검토 필요</h3>{["MYH7 VUS 근거 보강","어머니 가족 분리검사","심장 MRI 공동 판독"].map((x,i)=><button key={x} className="mt-3 flex w-full justify-between rounded-xl border p-3 text-left text-sm"><span>{x}</span><Badge variant="outline">{i===0?"긴급":"대기"}</Badge></button>)}</CardContent></Card></div>
  </div>
}

function Pedigree() {
  const [selected,setSelected]=useState(family[6]);
  return <div className="space-y-5"><div><h2 className="text-2xl font-bold">연결형 가계도</h2><p className="text-sm text-slate-500">인물을 눌러 가족력과 표현형을 확인하세요.</p></div><div className="grid gap-4 lg:grid-cols-[1fr_300px]"><Card className="overflow-x-auto rounded-3xl"><CardContent className="p-0"><div className="relative h-[500px] min-w-[680px] bg-slate-50"><svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M15 15 H35 M25 15 V35 H35 V46 M65 15 H85 M75 15 V35 H65 V46 M35 52 H65 M50 52 V79" fill="none" stroke="#94a3b8" strokeWidth=".5"/></svg>{family.map(p=><button key={p.id} onClick={()=>setSelected(p)} style={{left:`${p.x}%`,top:`${p.y}%`}} className="absolute -translate-x-1/2 -translate-y-1/2 text-center"><div className={`mx-auto h-12 w-12 border-2 ${p.shape==="circle"?"rounded-full":"rounded-lg"} ${p.affected?"border-violet-600 bg-violet-100":"border-slate-400 bg-white"} ${selected.id===p.id?"ring-4 ring-blue-200":""}`}>{p.patient&&<span className="font-black leading-[44px] text-violet-700">P</span>}</div><p className="mt-1 text-xs font-bold">{p.name}</p><p className="text-[10px] text-slate-500">{p.rel}</p></button>)}</div></CardContent></Card><Card className="h-fit rounded-3xl"><CardContent className="p-5"><Badge>{selected.rel}</Badge><h3 className="mt-2 text-xl font-bold">{selected.name}</h3><div className="mt-5 space-y-3 text-sm"><div className="rounded-xl bg-slate-50 p-3"><b>임상 표현형</b><p className="mt-1 text-slate-600">{selected.patient?"근력 저하, 부정맥, 청력 저하":selected.affected?"가족력 또는 관련 증상 있음":"등록된 증상 없음"}</p></div><Button className="w-full bg-violet-700">진료 기록 열기</Button></div></CardContent></Card></div></div>
}

function Genomics(){return <div className="space-y-5"><h2 className="text-2xl font-bold">유전체 공동 판독</h2>{[["MYH7","c.1208G>A","82%","VUS"],["OPA1","c.2708_2711del","71%","검토 중"],["MT-TL1","m.3243A>G","64%","추가 검사"]].map(v=><Card key={v[0]} className="rounded-2xl"><CardContent className="flex flex-wrap items-center gap-4 p-5"><Dna className="text-violet-700"/><div className="flex-1"><b>{v[0]} <span className="font-normal text-slate-500">{v[1]}</span></b><p className="text-xs text-slate-500">표현형 일치도 {v[2]} · 가족 분리검사 연계</p></div><Badge variant="secondary">{v[3]}</Badge><Button variant="outline">근거 검토</Button></CardContent></Card>)}</div>}

function Meeting(){
 const [mic,setMic]=useState(true), [cam,setCam]=useState(true), [joined,setJoined]=useState(false), [msg,setMsg]=useState("");
 const [messages,setMessages]=useState(["박도윤: 변이 근거를 화면에 공유하겠습니다."]);
 if(!joined)return <div className="mx-auto max-w-2xl pt-8"><Card className="rounded-3xl"><CardContent className="p-7 text-center"><Video className="mx-auto h-12 w-12 text-violet-700"/><h2 className="mt-5 text-2xl font-bold">희귀질환 영상 협진</h2><p className="mt-2 text-slate-500">VS-2026-0142 · 참가 예정 4명</p><div className="mt-6 rounded-2xl bg-slate-900 p-8 text-white">카메라 사전 점검<p className="mt-2 text-sm text-slate-400">실제 통화에는 Jitsi 서버 연동 필요</p></div><Button onClick={()=>setJoined(true)} className="mt-5 w-full bg-violet-700">협진룸 입장</Button></CardContent></Card></div>;
 return <div className="grid gap-4 lg:grid-cols-[1fr_320px]"><div><div className="grid min-h-[520px] grid-cols-2 gap-3 rounded-3xl bg-slate-950 p-4">{["김서진 · 소아신경과","박도윤 · 진단검사의학과","최유나 · 심장내과","정하람 · 이비인후과"].map((x,i)=><div key={x} className="relative flex items-center justify-center rounded-2xl bg-slate-800 text-white"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold">{x[0]}</div><span className="absolute bottom-3 left-3 text-xs">{x}</span></div>)}</div><div className="mt-3 flex justify-center gap-2"><Button onClick={()=>setMic(!mic)} variant={mic?"outline":"destructive"} size="icon">{mic?<Mic/>:<MicOff/>}</Button><Button onClick={()=>setCam(!cam)} variant={cam?"outline":"destructive"} size="icon">{cam?<Video/>:<VideoOff/>}</Button><Button variant="outline" size="icon"><MonitorUp/></Button><Button onClick={()=>setJoined(false)} variant="destructive"><PhoneOff className="mr-2 h-4 w-4"/>나가기</Button></div></div><Card className="h-fit rounded-3xl"><CardContent className="p-5"><h3 className="font-bold">협진 채팅·기록</h3><div className="mt-4 h-72 space-y-3 overflow-y-auto">{messages.map((m,i)=><p key={i} className="rounded-xl bg-slate-100 p-3 text-sm">{m}</p>)}</div><div className="mt-3 flex gap-2"><Input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="의견 입력"/><Button size="icon" onClick={()=>{if(msg.trim()){setMessages([...messages,`나: ${msg}`]);setMsg("")}}}><Send className="h-4 w-4"/></Button></div></CardContent></Card></div>
}

export default function App(){
 const [page,setPage]=useState("home");
 const nav=[["home","협진 케이스",Home],["family","가계도",Users],["genomics","유전체",Dna],["meeting","영상 협진",MessageSquare]];
 return <div className="min-h-screen bg-slate-50"><header className="sticky top-0 z-30 border-b bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between p-4"><button onClick={()=>setPage("home")} className="flex items-center gap-2"><span className="rounded-xl bg-violet-700 p-2 text-white"><HeartPulse/></span><div className="text-left"><b>VitalSign</b><p className="text-[10px] text-slate-500">희귀질환 다학제 협진</p></div></button><Badge className="bg-emerald-100 text-emerald-700">의료진 전용</Badge></div></header><div className="mx-auto flex max-w-7xl"><aside className="hidden w-56 border-r bg-white p-3 md:block">{nav.map(([id,label,Icon])=><button key={id} onClick={()=>setPage(id)} className={`mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-sm font-semibold ${page===id?"bg-violet-700 text-white":"text-slate-600"}`}><Icon className="h-5 w-5"/>{label}</button>)}</aside><main className="min-w-0 flex-1 p-4 sm:p-7"><motion.div key={page} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>{page==="home"?<Dashboard go={setPage}/>:page==="family"?<Pedigree/>:page==="genomics"?<Genomics/>:<Meeting/>}</motion.div></main></div></div>
}
