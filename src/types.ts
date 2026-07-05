/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface BeforeAfterItem {
  id: number;
  title: string;
  beforeImg: string;
  afterImg: string;
  description: string;
}

export interface ConsultationSubmit {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ConsultationRequest extends ConsultationSubmit {
  id: string;
  date: string;
  status: 'pending' | 'confirmed';
}
